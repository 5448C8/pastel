import globby from "globby";
import { performance } from "perf_hooks";
import { transformAsync, Visitor } from "@babel/core";
import type * as Babel from "@babel/core";
import { extractCssFromAst } from "@linaria/babel-preset";
import postcss from "postcss";
import postcssCustomProperties from "postcss-custom-properties";
import fs from "fs/promises";
import path from "path";

const root = path.join(process.cwd(), "src");
const build = path.join(process.cwd(), "build");

function idk({ types }: typeof Babel): {
  visitor: Visitor;
} {
  return {
    visitor: {
      Program: {
        exit(p, state: any) {
          if (state.file.metadata.linaria) {
            p.node.body.unshift(
              types.importDeclaration(
                [],
                types.stringLiteral(
                  `./${path.relative(path.dirname(state.opts.outputFileName), state.opts.cssOutputFileName)}`
                )
              )
            );
          }
        },
      },
    },
  };
}

interface PluginOptions {
  inputFileName: string;
  outputFileName: string;
  sourceMapFileName: string;
  relativeCssFileName: string;
  cssFileName: string;
}

function idkPreset(_: any, opts: PluginOptions) {
  return {
    plugins: [[idk, opts]],
  };
}

function formatTime(duration: number) {
  const milliseconds = Math.floor((duration % 1000) / 100);
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let str = "";

  if (hours > 0) {
    str += `${hours}h `;
  }

  if (minutes > 0) {
    str += `${minutes}m `;
  }

  if (seconds > 0) {
    str += `${seconds}s `;
  }

  str += `${milliseconds || 0}ms`;

  return str.trim();
}

const timings = new Map<string, Map<string, string>>();

export async function babel(fileName: string, global = false) {
  const times = new Map<string, string>();
  timings.set(fileName, times);
  const start = performance.now();
  const code = await fs.readFile(fileName, "utf-8");
  const read = performance.now();
  times.set("read", formatTime(read - start));
  const parsedOutputFilename = path.parse(path.join(build, path.relative(root, fileName)));
  const outputFilename = path.format({
    ext: ".js",
    dir: parsedOutputFilename.dir,
    name: parsedOutputFilename.name,
  });
  const cssOutputFilename = path.format({
    ext: ".css",
    dir: parsedOutputFilename.dir,
    name: parsedOutputFilename.name,
  });
  const a = await transformAsync(code, {
    filename: fileName,
    comments: false,
    compact: "auto",
    presets: [
      [
        idkPreset,
        {
          inputFileName: fileName,
          outputFileName: outputFilename,
          cssOutputFileName: cssOutputFilename,
        },
      ],
      [
        "@linaria",
        {
          evaluate: true,
          atomize: require("@linaria/atomic").atomize,
          babelOptions: {
            presets: ["@babel/preset-typescript"],
          },
        },
      ],
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
      "@babel/preset-typescript",
    ],
    ast: true,
    sourceMaps: true,
    sourceFileName: path.relative(path.dirname(outputFilename), fileName),
  });

  const firstBabelPass = performance.now();

  times.set("babel-pass", formatTime(firstBabelPass - read));
  if (!a) {
    throw new Error();
  }

  const b = extractCssFromAst(a, code, {
    filename: fileName,
    inputSourceMap: a.map!,
    outputFilename,
    pluginOptions: {
      babelOptions: {
        presets: ["@babel/preset-typescript"],
      },
    },
  });

  const linariaPass = performance.now();
  times.set("linaria-pass", formatTime(linariaPass - firstBabelPass));
  await fs.mkdir(path.dirname(outputFilename), {
    recursive: true,
  });
  await fs.writeFile(outputFilename, `${b.code}\n//# sourceMappingURL=${parsedOutputFilename.base}.map`);
  await fs.writeFile(`${outputFilename}.map`, JSON.stringify(b.sourceMap));
  if (b.cssText) {
    let cssSourceMap = JSON.parse(b.cssSourceMapText!);
    cssSourceMap.sources[0] = path.relative(path.dirname(outputFilename), fileName);
    cssSourceMap.file = `${parsedOutputFilename.name}.css`;
    if (!global) {
      const s = performance.now();
      const c = await postcss([
        postcssCustomProperties({
          importFrom: path.join(build, "global.css"),
        }),
      ]).process(b.cssText!, {
        from: path.relative(path.dirname(outputFilename), fileName),
        map: {
          prev: cssSourceMap,
          inline: false,
          annotation: false,
          absolute: false,
        },
      });
      const postcssPass = performance.now();
      times.set("posscss-pass", formatTime(postcssPass - s));
      cssSourceMap = c.map.toJSON();
      b.cssText = c.css;
    }

    await fs.writeFile(cssOutputFilename, `${b.cssText}\n/*# sourceMappingURL=${parsedOutputFilename.name}.css.map */`);
    await fs.writeFile(`${cssOutputFilename}.map`, JSON.stringify(cssSourceMap));
  }
}

async function buildIcon(fileName: string) {
  const code = await fs.readFile(fileName, "utf-8");
  const parsedOutputFilename = path.parse(fileName);
  const outputFilename = path.format({
    ext: ".js",
    dir: parsedOutputFilename.dir,
    name: parsedOutputFilename.name,
  });
  const a = await transformAsync(code, {
    filename: fileName,
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
      "@babel/preset-typescript",
    ],
    ast: true,
    sourceMaps: true,
    sourceFileName: path.relative(path.dirname(outputFilename), fileName),
  });
  if (!a) {
    throw new Error();
  }

  await fs.mkdir(path.dirname(outputFilename), {
    recursive: true,
  });
  await fs.writeFile(outputFilename, `${a.code}\n//# sourceMappingURL=${parsedOutputFilename.base}.map`);
  await fs.writeFile(`${outputFilename}.map`, JSON.stringify(a.map!));
}

async function run() {
  const sourceFiles = await globby("./src/**/*", { absolute: true, ignore: ["global.ts"] });
  const start = performance.now();
  const globalFile = path.join(process.cwd(), "src", "global.ts");
  await babel(globalFile, true);
  await Promise.all(sourceFiles.map((b) => babel(b, false)));
  const icons = await globby("./icons/*.{ts,tsx}", { absolute: true, ignore: ["**/*.d.ts"] });
  await Promise.all(icons.map(buildIcon));

  const end = performance.now();

  console.log(formatTime(end - start));
}

run();

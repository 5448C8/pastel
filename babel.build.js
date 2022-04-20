module.exports = (api) => {
  api.assertVersion("7");

  return {
    // ...
    presets: ["@babel/preset-typescript"],
  };
};

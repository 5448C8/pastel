import { cx } from "@linaria/core";
import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cx("pastel-icon", className)}
    viewBox={"0 0 16 16"}
    width={"1em"}
    height={"1em"}
    fill={"none"}
    xmlns={"http://www.w3.org/2000/svg"}
    ref={ref}
    {...props}>
    <g fill={"currentColor"}>
      <path
        d={
          "M14.834 0H1.15A1.15 1.15 0 0 0 0 1.15v13.684a1.151 1.151 0 0 0 1.15 1.15h13.684A1.152 1.152 0 0 0 16 14.835V1.15A1.151 1.151 0 0 0 14.834 0ZM2.302 2.302h11.396v2.87H2.302v-2.87Zm0 11.396V7.473h11.396v6.225H2.302Z"
        }
      />
      <path
        d={
          "M12.082 8.496h-.977a1.259 1.259 0 0 0-2.015 0H3.918a.767.767 0 0 0 0 1.535H9.09a1.26 1.26 0 0 0 2.015 0h.977a.767.767 0 0 0 0-1.535Zm-1.985 1.535a.762.762 0 1 1 .762-.762.762.762 0 0 1-.762.757v.005ZM12.082 11.37H6.68a1.264 1.264 0 0 0-2.015 0h-.747a.767.767 0 0 0 0 1.535h.747a1.259 1.259 0 0 0 2.015 0h5.402a.767.767 0 0 0 0-1.534Zm-6.41 1.535a.762.762 0 1 1 .763-.762.762.762 0 0 1-.762.757v.005Z"
        }
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

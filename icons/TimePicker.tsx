import { cx } from "@linaria/core";
import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cx("pastel-icon", className)}
    viewBox={"0 0 16 16"}
    xmlns={"http://www.w3.org/2000/svg"}
    width={"1em"}
    height={"1em"}
    fill={"none"}
    ref={ref}
    {...props}>
    <g fill={"currentColor"}>
      <path
        d={
          "M14.53 10.07V4.643a2.888 2.888 0 0 0-2.878-2.891h-1.515v-.256a.501.501 0 0 0-.5-.501.501.501 0 0 0-.498.501v.256H5.38v-.256a.501.501 0 0 0-.498-.501.501.501 0 0 0-.498.501v.256H2.872A2.89 2.89 0 0 0 0 4.643v8.123a2.888 2.888 0 0 0 2.877 2.891h6.342a3.85 3.85 0 0 0 2.917 1.348c2.134 0 3.864-1.744 3.864-3.883a3.895 3.895 0 0 0-1.47-3.047v-.005Zm-5.261 3.046a2.875 2.875 0 0 1 2.867-2.88 2.878 2.878 0 0 1 2.867 2.88 2.878 2.878 0 0 1-2.867 2.882 2.878 2.878 0 0 1-2.867-2.881Zm-7.275-.35V7.083h10.54v2.165a3.485 3.485 0 0 0-.398-.02c-2.134 0-3.864 1.744-3.864 3.883 0 .18.015.361.04.537H2.877a.886.886 0 0 1-.883-.887v.005Zm.883-9.005h1.51v.22c0 .276.225.502.5.502a.501.501 0 0 0 .498-.501V3.76h3.76v.22c0 .276.224.502.498.502a.501.501 0 0 0 .498-.501V3.76h1.516c.484 0 .883.396.883.887v1.438H1.994V4.648c0-.486.394-.887.883-.887Z"
        }
      />
      <path
        d={
          "M12.55 13.507c.12-.095.19-.24.19-.39v-1.78a.501.501 0 0 0-.5-.5.501.501 0 0 0-.498.5v1.539l-1.486 1.183a.5.5 0 1 0 .623.782l1.676-1.334h-.005Z"
        }
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

import { cx } from "@linaria/core";
import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cx("pastel-icon", className)}
    viewBox={"0 0 16 16"}
    width={"1em"}
    height={"1em"}
    xmlns={"http://www.w3.org/2000/svg"}
    ref={ref}
    {...props}>
    <g fill={"currentColor"}>
      <path
        d={
          "M0 16V8.497a1.005 1.005 0 0 1 2.01 0V16M3.5 16v-5.778a1.005 1.005 0 0 1 2.01 0V16M6.995 16V2.914a1.005 1.005 0 0 1 2.01 0V16M10.495 16V5.448a1.005 1.005 0 0 1 2.01 0V16M13.995 16V1.005a1.005 1.005 0 0 1 2.01 0v15"
        }
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

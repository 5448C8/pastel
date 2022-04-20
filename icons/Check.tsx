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
    <path
      d={
        "M6.075 14a1.511 1.511 0 0 1-.608-.125 1.564 1.564 0 0 1-.514-.36L.426 8.795A1.694 1.694 0 0 1 0 7.64a1.69 1.69 0 0 1 .465-1.14c.29-.304.683-.477 1.094-.485.41-.008.809.151 1.11.444l3.406 3.55 7.256-7.564c.301-.292.7-.451 1.11-.444.411.008.803.181 1.094.484.291.304.457.712.465 1.14.007.43-.146.844-.426 1.158l-8.378 8.733c-.297.31-.7.485-1.121.485Z"
      }
      fill={"currentColor"}
    />
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

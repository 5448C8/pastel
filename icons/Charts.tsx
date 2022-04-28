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
        "M1 16a.987.987 0 0 1-.9-1.427L5.165 4.435a.989.989 0 0 1 .85-.55c.36-.02.71.165.9.47L9.84 9.076 14.1.551c.245-.491.845-.691 1.34-.451.495.24.7.836.455 1.327l-5.06 10.132a.995.995 0 0 1-.85.551c-.36.01-.71-.165-.9-.47L6.16 6.918l-4.26 8.53c-.175.35-.53.55-.9.55Z"
      }
      fill={"currentColor"}
    />
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

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
    ref={ref}
    {...props}>
    <g fill={"currentColor"}>
      <path
        d={
          "M14.655 4.033h-.28V2a2 2 0 0 0-2-2.001h-8.75a2 2 0 0 0-2 2.001v2.032h-.28C.6 4.033 0 4.633 0 5.378v4.058c0 .745.6 1.346 1.345 1.346h.28v3.217a2 2 0 0 0 2 2.001h8.75a2 2 0 0 0 2-2.001v-3.217h.28c.745 0 1.345-.6 1.345-1.346V5.378c0-.745-.6-1.345-1.345-1.345ZM3.625 2h8.75v2.032h-8.75V2ZM12.375 14h-8.75V9.06h8.75v4.938Zm1.26-6.43a.971.971 0 0 1 0-1.94.971.971 0 0 1 0 1.94Z"
        }
      />
      <path
        d={
          "M4.935 10.677h6.13c.275 0 .5-.226.5-.5 0-.276-.225-.5-.5-.5h-6.13c-.275 0-.5.224-.5.5 0 .274.225.5.5.5ZM11.065 11.687h-6.13c-.275 0-.5.225-.5.5 0 .276.225.5.5.5h6.13c.275 0 .5-.224.5-.5 0-.275-.225-.5-.5-.5Z"
        }
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

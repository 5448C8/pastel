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
        "M14.87 6.867H9.128V1.13a1.13 1.13 0 0 0-2.26 0v5.737H1.13a1.13 1.13 0 1 0 0 2.26h5.737v5.743a1.13 1.13 0 1 0 2.26 0V9.128h5.743a1.13 1.13 0 1 0 0-2.26Z"
      }
      fill={"currentColor"}
    />
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

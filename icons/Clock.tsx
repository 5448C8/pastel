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
    <path
      fill={"currentColor"}
      d={
        "M8 2c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6Zm0-2C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Zm4.01 9.87c.23-.5.02-1.1-.48-1.33L9 7.36V4.57c0-.55-.45-1-1-1s-1 .45-1 1v4.06l3.68 1.72c.14.06.28.09.42.09.38 0 .74-.21.91-.58v.01Z"
      }
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

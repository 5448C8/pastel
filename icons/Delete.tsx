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
          "M11.728 4.272a.93.93 0 0 0-1.313 0L8.012 6.675 5.609 4.272a.93.93 0 0 0-1.313 1.313l2.403 2.403-2.403 2.403a.93.93 0 1 0 1.313 1.313l2.403-2.403 2.403 2.403a.929.929 0 0 0 1.313-1.313L9.325 7.988l2.403-2.403a.929.929 0 0 0 0-1.313Z"
        }
      />
      <path d={"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Zm0 15.025A7.025 7.025 0 1 1 8 .975a7.025 7.025 0 0 1 0 14.05Z"} />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

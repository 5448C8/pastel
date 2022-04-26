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
          "M14.842 13.683H2.317V1.158a1.158 1.158 0 1 0-2.317 0v13.684A1.158 1.158 0 0 0 1.158 16h13.684a1.158 1.158 0 1 0 0-2.317Z"
        }
      />
      <path
        d={
          "M4.67 11.11a.747.747 0 0 1-.552-.227.766.766 0 0 1 0-1.102l3.156-3.156a.772.772 0 0 1 1.092 0L9.694 7.95l2.852-2.852a.772.772 0 0 1 1.096 1.08l-3.397 3.398a.757.757 0 0 1-.546.227.751.751 0 0 1-.546-.227L7.825 8.273l-2.61 2.61a.762.762 0 0 1-.546.226Z"
        }
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

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
    <g>
      <path
        d={
          "m10.05 8 5.53-5.529a1.452 1.452 0 0 0 0-2.05 1.452 1.452 0 0 0-2.051 0L8 5.948 2.471.428a1.43 1.43 0 0 0-2.043 0 1.43 1.43 0 0 0 0 2.043L5.957 8l-5.53 5.529a1.452 1.452 0 0 0 1.022 2.478c.37 0 .74-.145 1.022-.427L8 10.05l5.529 5.53c.283.282.652.427 1.022.427s.739-.145 1.021-.427a1.452 1.452 0 0 0 0-2.051L10.044 8h.007Z"
        }
        fill={"currentColor"}
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

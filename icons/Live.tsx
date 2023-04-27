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
          "M8.035 9.584a2.021 2.021 0 0 0 2.024-2.019 2.021 2.021 0 0 0-2.024-2.018 2.021 2.021 0 0 0-2.024 2.018c0 1.115.906 2.019 2.024 2.019ZM12.599 14a.493.493 0 0 1-.396-.195.498.498 0 0 1 .085-.7A6.931 6.931 0 0 0 14.993 7.6a6.956 6.956 0 0 0-1.888-4.76c-.19-.2-.18-.52.025-.705.2-.19.52-.18.706.025a7.936 7.936 0 0 1 2.159 5.44 7.922 7.922 0 0 1-3.096 6.295c-.09.07-.2.105-.305.105h.005ZM3.401 14a.503.503 0 0 1-.305-.105A7.922 7.922 0 0 1 0 7.6c0-2.023.766-3.956 2.159-5.44.19-.2.506-.21.706-.025.2.19.21.504.025.704A6.947 6.947 0 0 0 1.002 7.6c0 2.164.987 4.172 2.705 5.506.22.17.255.484.085.7a.508.508 0 0 1-.396.194h.005Z"
        }
      />
      <path
        d={
          "M11.04 12.137a.493.493 0 0 1-.395-.195.498.498 0 0 1 .085-.7 4.407 4.407 0 0 0 1.723-3.507 4.427 4.427 0 0 0-1.202-3.032c-.19-.2-.18-.52.025-.705.2-.19.521-.18.707.025a5.421 5.421 0 0 1-.636 8.008c-.09.07-.201.106-.306.106ZM4.96 12.137a.503.503 0 0 1-.306-.105 5.407 5.407 0 0 1-2.11-4.297 5.43 5.43 0 0 1 1.474-3.712c.19-.2.505-.21.706-.025.2.19.21.505.025.705a4.418 4.418 0 0 0-1.202 3.032c0 1.38.626 2.653 1.723 3.507.22.17.255.485.085.7a.508.508 0 0 1-.396.195Z"
        }
      />
    </g>
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

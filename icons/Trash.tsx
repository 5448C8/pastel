import { cx } from "@linaria/core";
import * as React from "react";
import { SVGProps, Ref, forwardRef, memo } from "react";

const SvgComponent = ({ className, ...props }: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    className={cx("pastel-icon", className)}
    width={"1em"}
    height={"1em"}
    viewBox={"0 0 16 16"}
    xmlns={"http://www.w3.org/2000/svg"}
    ref={ref}
    {...props}>
    <g fill={"currentColor"}>
      <path
        d={
          "M6.192 11.784V5.057a.512.512 0 0 0-1.027 0v6.727a.512.512 0 0 0 1.027 0ZM8.5 11.784V5.057a.515.515 0 0 0-1.031 0v6.727a.515.515 0 0 0 .88.364.515.515 0 0 0 .152-.364ZM10.835 11.784V5.057a.512.512 0 0 0-1.027 0v6.727a.512.512 0 0 0 1.027 0ZM14.833 1.156h-4.148A1.157 1.157 0 0 0 9.953.082 1.164 1.164 0 0 0 9.503 0H6.497a1.163 1.163 0 0 0-1.162 1.15H1.167A1.178 1.178 0 0 0-.01 2.327 1.174 1.174 0 0 0 1.167 3.5h13.666A1.168 1.168 0 0 0 16 2.336a1.164 1.164 0 0 0-1.167-1.165v-.015Z"
        }
      />
      <path
        d={
          "M14.282 4.261h-1.273a.502.502 0 0 0-.5.46l-.937 8.603a.41.41 0 0 1-.411.37H4.874a.411.411 0 0 1-.41-.37l-.937-8.602a.5.5 0 0 0-.501-.46H1.718a.502.502 0 0 0-.5.56l1.021 9.533a1.864 1.864 0 0 0 1.859 1.65h7.804a1.87 1.87 0 0 0 1.859-1.65l1.027-9.533a.5.5 0 0 0-.506-.56Z"
        }
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

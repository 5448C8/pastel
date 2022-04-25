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
          "M11.869 9.346v4.665H1.987V4.12h4.66a.173.173 0 0 0 .133-.061l1.6-1.596a.194.194 0 0 0-.138-.332H.993A1.018 1.018 0 0 0 0 3.151v11.88a1.02 1.02 0 0 0 1.019.995h11.869a1.018 1.018 0 0 0 .993-.995v-7.28a.193.193 0 0 0-.331-.139l-1.625 1.602a.185.185 0 0 0-.056.132ZM13.565 3.83a.984.984 0 0 0 .285-.73v-.199l-.03-.086a.594.594 0 0 0-.036-.102l-.04-.077-.062-.097-.076-.066a.708.708 0 0 0-.087-.092l-.071-.061a.289.289 0 0 0-.066-.04l-.077-.047-.102-.04a1.017 1.017 0 0 0-.305-.052 1.09 1.09 0 0 0-.77.322l-1.66 1.657h1.4v1.402l1.697-1.693Z"
        }
      />
      <path
        d={
          "M13.28.5 4.697 9.09l-.51 2.249a.398.398 0 0 0 .387.484c.03.005.062.005.092 0l2.241-.51 8.66-8.668a1.56 1.56 0 0 0-.143-2.304A1.477 1.477 0 0 0 14.482 0c-.45.001-.883.18-1.202.5Z"
        }
      />
    </g>
  </svg>
);

const ForwardRef = forwardRef(SvgComponent);
const Memo = memo(ForwardRef);

export default Memo;

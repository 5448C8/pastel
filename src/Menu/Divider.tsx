import { css } from "@linaria/core";
import { memo } from "react";
import "../global";

const BasicDivider = css`
  width: 100%;
  height: 1px;
  background-color: var(--button-disabled);
`;
const Divider = () => {
  return <li className={BasicDivider} role={"separator"} />;
};

export default memo(Divider);

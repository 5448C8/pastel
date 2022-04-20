import { css, cx } from "@linaria/core";
import { FunctionComponent, PropsWithChildren, memo } from "react";
import "../global";
//@ts-ignore
import Delete from "../../icons/Delete";

const BasicTag = css`
  background-color: var(--info-1);
  border: 1px solid var(--info-5);
  border-radius: 24px;
  padding: 0 12px;
  display: inline-flex;

  font-size: 14px;
  line-height: 20px;

  color: var(--info-5);
  align-items: center;
`;

const DeleteIcon = css`
  margin-left: 6px;
  cursor: pointer;
`;

export type TagProps = {
  onClose?: () => void;
  className?: string;
};

const Tag: FunctionComponent<PropsWithChildren<TagProps>> = ({ children, className, onClose }) => {
  return (
    <div className={cx(BasicTag, className)}>
      <span>{children}</span>
      {onClose && <Delete className={DeleteIcon} onClick={onClose} />}
    </div>
  );
};

export default memo(Tag);

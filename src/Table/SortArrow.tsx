import { css, cx } from "@linaria/core";

const Container = css`
  width: 16px;
  height: 16px;
  position: relative;
`;

export type SortArrowProps = {
  onClick?: () => void;
  direction?: "up" | "down";
};
const SortArrow: React.FC<SortArrowProps> = ({ onClick, direction }) => {
  return (
    <div className={cx(Container)} onClick={onClick}>
      <div
        className={css`
          position: absolute;
          width: 2px;
          background-color: currentColor;
          height: 14px;
          top: 1px;
          left: calc(50% - 1px);
          border-radius: 4px;
        `}
      />
      <div
        className={cx(
          css`
            position: absolute;
            &::before,
            &::after {
              content: "";
              position: absolute;
              width: 2px;
              height: 8px;
              background-color: currentColor;
              border-radius: 4px;
              transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
              will-change: transform;
            }
          `,
          direction === "up" &&
            css`
              &::before {
                transform: translate(5px, 0px) rotate(45deg);
              }
              &::after {
                transform: translate(9px, 0px) rotate(-45deg);
              }
            `,
          direction === "down" &&
            css`
              &::before {
                transform: translate(5px, 8px) rotate(135deg);
              }
              &::after {
                transform: translate(9px, 8px) rotate(-135deg);
              }
            `
        )}
      />
    </div>
  );
};

export default SortArrow;

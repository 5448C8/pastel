import { css, cx } from "@linaria/core";
import { ChangeEvent, forwardRef, ForwardRefRenderFunction, memo, PropsWithChildren, useCallback, useId } from "react";
import "../global";

const HiddenSwitchInput = css`
  position: absolute;
  opacity: 0;
`;

const BasicSwitch = css`
  position: relative;
`;

const SwitchLabel = css`
  display: inline-block;
  cursor: pointer;
  width: 48px;
  height: 24px;

  border-radius: 24px;

  border: 2px solid var(--text-default);

  transition: 0.25s border-color, 0.25s background-color;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 4px;
    left: 4px;
    background-color: var(--text-default);
    border-radius: 50%;
    transition: 0.25s left;
  }
`;

const SwitchLabelChecked = css`
  border-color: var(--primary-5);

  &::after {
    left: calc(100% - 20px);
    background-color: var(--primary-4);
  }
`;

const SwitchLabelFilled = css`
  background-color: var(--button-disabled);
  border: none;
  &.${SwitchLabelChecked} {
    background-color: var(--primary-4);
  }
  &::after {
    background-color: var(--pure-white);
    width: 18px;
    height: 18px;
    top: 3px;
    left: 3px;
  }
  &.${SwitchLabelChecked}::after {
    left: calc(100% - 21px);
  }
`;

export type SwitchVariant = "outline" | "filled";
export type SwitchProps = {
  variant?: SwitchVariant;
  value?: boolean;
  onChange?: (b: boolean) => void;
  className?: string;
};

const Switch: ForwardRefRenderFunction<HTMLInputElement, PropsWithChildren<SwitchProps>> = (
  { value, onChange: _onChange, className, variant = "filled" },
  ref
) => {
  const id = useId();
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      _onChange?.(e.target.checked);
    },
    [_onChange]
  );
  return (
    <div className={cx(BasicSwitch, className)}>
      <input id={id} type={"checkbox"} className={HiddenSwitchInput} checked={value} onChange={onChange} ref={ref} />
      <label
        htmlFor={id}
        className={cx(SwitchLabel, variant === "filled" && SwitchLabelFilled, value && SwitchLabelChecked)}
      />
    </div>
  );
};

export default memo(forwardRef(Switch));

import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { css, cx } from "@linaria/core";
import "../global";

const BasicInput = css`
  padding: 4px 12px;
  margin: 0;
  border-radius: 4px;
  border: 1px solid var(--text-default);

  font-size: 14px;
  line-height: 20px;
  font-weight: 400;

  width: 100%;

  &::placeholder {
    color: var(--button-disabled);
  }

  &:not([disabled]):hover {
    border-color: var(--primary-3);
  }

  &:not([disabled]):focus,
  &:not([disabled]):active {
    border-color: var(--primary-4);
    box-shadow: 0px 0px 0px 2px #bdbada;
  }

  &[disabled] {
    background: var(--button-background);
    border-color: var(--button-disabled);
  }
`;

export type InputProps = {
  _?: any;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps & JSX.IntrinsicElements["input"]> = (
  { className, ...props },
  ref
) => {
  return <input {...props} className={cx(BasicInput, className)} ref={ref} />;
};

const BasicTextArea = css`
  padding: 4px 8px;
  font-family: inherit;
  resize: none;
`;

const TextArea: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps & JSX.IntrinsicElements["textarea"]> = (
  { className, ...props },
  ref
) => {
  return <textarea {...props} className={cx(BasicInput, BasicTextArea, className)} ref={ref} />;
};

export default forwardRef(Input);

const ForwardedTextAreaa = forwardRef(TextArea);

export { ForwardedTextAreaa as TextArea };

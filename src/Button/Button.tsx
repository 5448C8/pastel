import React, { forwardRef, ForwardRefRenderFunction, memo } from "react";
import { css, cx } from "@linaria/core";
import "../global";

const DangerButton = css``;

const HasOnlyIcon = css``;

const BasicButton = css`
  outline: none;
  font-family: inherit;
  display: inline-block;

  text-align: center;

  border-radius: 4px;
  &.${HasOnlyIcon} {
    border-radius: 50%;
    padding: 0;
    height: 34px;
    width: 34px;
  }
  color: var(--text-default);
  border: none;

  padding: 8px 16px;
  margin: 0;

  font-size: 16px;
  font-weight: 600;
  line-height: 16px;

  transition: box-shadow 0.5s;

  & .pastel-icon:not(:only-child) {
    margin-right: 10px;
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):active,
  &:not([disabled]):focus {
    box-shadow: 0px 0px 0px 4px var(--primary-2);
  }
  &.${DangerButton}:not([disabled]):active,
  &.${DangerButton}:not([disabled]):focus {
    box-shadow: 0px 0px 0px 4px rgba(228, 0, 0, 0.25);
  }
`;

const SecondaryButton = css`
  border: 1px solid var(--neutral-black);
  &.${DangerButton} {
    border-color: var(--danger-4);
    color: var(--danger-4);
  }
  background-color: var(--button-background);
  &:not([disabled]):hover {
    color: var(--primary-3);
    border-color: var(--primary-4);
  }
  &.${DangerButton}:not([disabled]):hover {
    color: var(--danger-3);
    border-color: var(--danger-4);
  }
  &:not([disabled]):active {
    color: var(--primary-5);
    border-color: var(--primary-5);
  }
  &.${DangerButton}:not([disabled]):active {
    color: var(--danger-5);
    border-color: var(--danger-5);
  }
`;

const PrimaryButton = css`
  color: var(--pure-white);
  background-color: var(--primary-4);
  border: 1px solid var(--primary-6);

  &.${DangerButton} {
    border-color: var(--danger-6);
    background-color: var(--danger-4);
  }

  &:not([disabled]):hover {
    background-color: var(--primary-3);
    border-color: var(--primary-5);
  }

  &.${DangerButton}:not([disabled]):hover {
    background-color: var(--danger-3);
    border-color: var(--danger-5);
  }

  &:not([disabled]):active {
    background-color: var(--primary-5);
    border-color: var(--primary-5);
  }

  &.${DangerButton}:not([disabled]):active {
    background-color: var(--danger-5);
    border-color: var(--danger-5);
  }
`;

const LargeButton = css`
  padding: 12px 24px;
  font-size: 20px;
  line-height: 20px;
  &.${HasOnlyIcon} {
    height: 46px;
    width: 46px;
  }
`;

const SmallButton = css`
  padding: 4px 8px;
  font-size: 14px;
  line-height: 14px;
  .pastel-icon {
    font-size: 14px;
    vertical-align: middle;
  }

  &.${HasOnlyIcon} {
    height: 24px;
    width: 24px;
  }
`;

const DisabledButton = css`
  background-color: var(--button-disabled);
  border-color: var(--button-disabled);
  color: var(--text-disabled);
`;

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "large" | "default" | "small";
export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  danger?: boolean;
  icon?: React.ReactNode;
  rounded?: boolean;
};

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps & JSX.IntrinsicElements["button"]> = (
  { variant = "secondary", size = "default", danger, disabled, className, children, icon, rounded, ...props },
  ref
) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cx(
        BasicButton,
        variant === "secondary" && SecondaryButton,
        variant === "primary" && PrimaryButton,
        size === "large" && LargeButton,
        size === "small" && SmallButton,
        disabled && DisabledButton,
        danger && DangerButton,
        icon && rounded && !children && HasOnlyIcon,
        className
      )}
      ref={ref}>
      {icon}
      {typeof children === "string" ? <span>{children}</span> : children}
    </button>
  );
};

export default memo(forwardRef(Button));

const BasicLinkButton = css`
  color: var(--primary-4);

  &.${DangerButton} {
    color: var(--danger-4);
  }
  text-decoration: none;

  font-size: 16px;
  font-weight: 600;
  line-height: 16px;

  &:hover,
  &:active {
    text-decoration: underline;
  }

  &:hover {
    color: var(--primary-3);
  }

  &.${DangerButton}:hover {
    color: var(--danger-3);
  }

  &:active {
    color: var(--primary-5);
  }

  &.${DangerButton}:active {
    color: var(--danger-5);
  }
`;

const LargeLinkButton = css`
  font-size: 20px;
  line-height: 20px;
`;

const SmallLinkButton = css`
  font-size: 14px;
  line-height: 14px;
`;

export type LinkButtonProps = {
  size?: ButtonSize;
  danger?: boolean;
};

const LinkButton: ForwardRefRenderFunction<HTMLAnchorElement, LinkButtonProps & JSX.IntrinsicElements["a"]> = (
  { size, className, danger, ...props },
  ref
) => {
  return (
    <a
      {...props}
      className={cx(
        BasicLinkButton,
        size === "large" && LargeLinkButton,
        size === "small" && SmallLinkButton,
        danger && DangerButton,
        className
      )}
      ref={ref}
    />
  );
};

const ForwardedLinkButton = memo(forwardRef(LinkButton));

export { ForwardedLinkButton as LinkButton };

const BasicIconButton = css`
  outline: none;
  font-family: inherit;
  display: inline-block;
  background: transparent;
  transition: background 0.2s ease-in-out;
  border: none;

  &.${DangerButton} {
    color: var(--danger-4);
  }

  &:not([disabled]):hover {
    background-color: var(--icon-button-hover);
  }
`;

export type IconButtonProps = {
  size?: ButtonSize;
  danger?: boolean;
  icon: React.ReactNode;
};

const IconButton: ForwardRefRenderFunction<HTMLButtonElement, IconButtonProps & JSX.IntrinsicElements["button"]> = (
  { size, danger, icon, className, ...props },
  ref
) => {
  return (
    <button
      {...props}
      className={cx(
        BasicButton,
        BasicIconButton,
        danger && DangerButton,
        size === "small" && SmallButton,
        size === "large" && LargeButton,
        className
      )}
      ref={ref}>
      {icon}
    </button>
  );
};

const ForwardedIconButton = memo(forwardRef(IconButton));

export { ForwardedIconButton as IconButton };

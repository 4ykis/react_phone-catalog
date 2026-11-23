import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

type Palette = 'primary' | 'secondary' | 'tertiary';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  palette?: Palette;
  size?: Size;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  isIcon?: boolean;
  className?: string;
  isSelected?: boolean;
  ariaLabel?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      palette = 'primary',
      size = 'md',
      type = 'button',
      disabled = false,
      isIcon = false,
      fullWidth = false,
      isSelected = false,
      className,
      ariaLabel,
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      className={classNames(
        styles.button,
        styles[palette],
        styles[size],
        { [styles['button--selected']]: isSelected },
        { [styles['button-icon']]: isIcon },
        { [styles['full-width']]: fullWidth },
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

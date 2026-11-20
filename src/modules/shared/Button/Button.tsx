import classNames from 'classnames';
import styles from './Button.module.scss';

type Palette = 'primary' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  palette?: Palette;
  size?: Size;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  palette = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className,
}: Props) => (
  <button
    type={type}
    className={classNames(
      styles.button,
      styles[palette],
      styles[size],
      { [styles['full-width']]: fullWidth },
      className,
    )}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

import ArrowDown from '../../../assets/icons/arrow-down.svg?react';
import ArrowLeft from '../../../assets/icons/arrow-left.svg?react';
import ArrowRight from '../../../assets/icons/arrow-right.svg?react';
import ArrowUp from '../../../assets/icons/arrow-up.svg?react';
import Cart from '../../../assets/icons/cart.svg?react';
import Close from '../../../assets/icons/close.svg?react';
import Heart from '../../../assets/icons/heart.svg?react';
import HeartFilled from '../../../assets/icons/heart-filled.svg?react';
import Home from '../../../assets/icons/home.svg?react';
import Menu from '../../../assets/icons/menu.svg?react';
import Minus from '../../../assets/icons/minus.svg?react';
import Plus from '../../../assets/icons/plus.svg?react';
import Search from '../../../assets/icons/search.svg?react';

const icons = {
  'arrow-down': ArrowDown,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  cart: Cart,
  close: Close,
  heart: Heart,
  'heart-filled': HeartFilled,
  home: Home,
  menu: Menu,
  minus: Minus,
  plus: Plus,
  search: Search,
};

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  className?: string;
  size?: string;
};

export const Icon = ({ name, className, size = '16' }: Props) => {
  const SvgIcon = icons[name];

  return (
    <SvgIcon
      aria-hidden="true"
      className={className}
      width={`${size}px`}
      height={`${size}px`}
    />
  );
};

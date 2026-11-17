import classNames from 'classnames';
import { Link, useMatch } from 'react-router-dom';
import styles from '../Header.module.scss';

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  isIcon?: boolean;
};

export const NavItem = ({ to, children, className, isIcon }: Props) => {
  const isActive = useMatch({ path: to, end: to === '/' }) !== null;

  return (
    <li
      className={classNames(styles['header-nav-item'], className, {
        [styles.active]: isActive,
      })}
    >
      <Link
        to={to}
        className={classNames(
          styles['header-nav-link'],
          { [styles['header-nav-link--icon']]: isIcon },
          'text-upp',
        )}
      >
        {children}
      </Link>
    </li>
  );
};

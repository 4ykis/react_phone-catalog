import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { NavItem } from './components/NavLink';
import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          <Logo />
        </div>
        <ul
          className={classNames(
            styles['header-nav'],
            styles['header-nav--spaced'],
          )}
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/phones">Phones</NavItem>
          <NavItem to="/tablets">Tablets</NavItem>
          <NavItem to="/accessories">Accessories</NavItem>
        </ul>
        <ul className={styles['header-nav']}>
          <NavItem to="/favorites" isIcon={true}>
            <Icon name="heart" />
            {/* make counter icon */}
          </NavItem>
          <NavItem to="/cart" isIcon={true}>
            <Icon name="cart" />
            {/* make counter icon */}
          </NavItem>
        </ul>
      </div>
    </header>
  );
};

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { Logo } from '../Logo';
import { Icon } from '../Icon';
import { useIsMobile } from '../../../utils/useIsMobile';
import { useStore } from '../../../store/Store';
import { useTheme } from '../../../utils/useTheme';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const ICON_LINKS = [
  { to: '/favorites', label: 'Favorites', icon: 'heart' },
  { to: '/cart', label: 'Cart', icon: 'cart' },
] as const;

const getLinkClass = (extra: string) => {
  return ({ isActive }: { isActive: boolean }) =>
    classNames(styles['nav-link'], 'text-upp', extra, {
      [styles.active]: isActive,
    });
};

export const Header = () => {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, favorites } = useStore();
  const { theme, toggleTheme } = useTheme();

  const counts = {
    '/favorites': favorites.length,
    '/cart': cart.length,
  };

  // close the menu on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // close the menu when switching to desktop layout
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // close the menu on Escape
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div
        className={classNames(
          styles['header-container'],
          'container container--full',
        )}
      >
        <Link to="/" className={styles['header-logo']} aria-label="Home">
          <Logo />
        </Link>

        {isMobile && (
          <button
            type="button"
            className={styles['header-nav-toggle']}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="main-nav"
            onClick={() => setIsOpen(current => !current)}
          >
            <Icon name={isOpen ? 'close' : 'menu'} />
          </button>
        )}

        <nav
          id="main-nav"
          aria-label="Main"
          className={classNames(styles['header-nav'], {
            [styles['header-nav--open']]: isOpen,
          })}
        >
          <div className={styles['header-nav-links']}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={getLinkClass(styles['nav-link--text'])}
              >
                {label}
              </NavLink>
            ))}
          </div>

          <div className={styles['header-nav-icons']}>
            {ICON_LINKS.map(({ to, label, icon }) => {
              const count = counts[to];

              return (
                <NavLink
                  key={to}
                  to={to}
                  aria-label={count ? `${label}, ${count} items` : label}
                  className={getLinkClass(styles['nav-link--icon'])}
                >
                  <span className={styles['icon-wrapper']}>
                    <Icon name={icon} />

                    {count > 0 && (
                      <span className={styles.counter} aria-hidden="true">
                        {count}
                      </span>
                    )}
                  </span>
                </NavLink>
              );
            })}

            <button
              type="button"
              className={classNames(
                styles['nav-link'],
                styles['nav-link--icon'],
                styles['theme-toggle'],
              )}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light theme'
                  : 'Switch to dark theme'
              }
              onClick={toggleTheme}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

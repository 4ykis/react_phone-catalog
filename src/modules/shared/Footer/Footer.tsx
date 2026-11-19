import { Link } from 'react-router-dom';
import { Logo } from './../Logo';
import classNames from 'classnames';
import styles from './footer.module.scss';
import { Icon } from '../Icon';
import { scrollToTop } from '../../../utils/scrollToTop';

export const Footer = () => {
  const backToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToTop();
  };

  return (
    <div className={styles.footer}>
      <div className={classNames(styles['footer-container'], 'container')}>
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
        <div className={styles['footer-links']}>
          <Link
            className={classNames(styles['footer-link'], 'text-upp')}
            to="https://github.com"
            target="_blank"
          >
            Github
          </Link>
          <Link
            className={classNames(styles['footer-link'], 'text-upp')}
            to="/contacts"
          >
            Contacts
          </Link>
          <Link
            className={classNames(styles['footer-link'], 'text-upp')}
            to="/rights"
          >
            Rights
          </Link>
        </div>
        <a href="" onClick={backToTop} className={styles['footer-top-link']}>
          <span className={styles['footer-top-link__text']}>Back to top</span>
          <span className={styles['footer-top-link__icon']}>
            <Icon name="arrow-up" />
          </span>
        </a>
      </div>
    </div>
  );
};

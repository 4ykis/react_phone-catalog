import { Link } from 'react-router-dom';
import { Logo } from './../Logo';
import classNames from 'classnames';
import styles from './footer.module.scss';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { scrollToTop } from '../../../utils/scrollToTop';

export const Footer = () => {
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
        <div className={styles['footer-top-link']}>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={styles['footer-top-link__text']}
            onClick={scrollToTop}
          >
            Back to top
          </button>

          <Button
            palette="tertiary"
            size="sm"
            isIcon
            ariaLabel="Back to top"
            onClick={scrollToTop}
          >
            <Icon name="arrow-up" />
          </Button>
        </div>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: Props) => (
  <nav aria-label="Breadcrumb">
    <ol className={styles.breadcrumbs}>
      <li className={styles.item}>
        <Link to="/" className={styles.link} aria-label="Home">
          <Icon name="home" />
        </Link>
      </li>

      {items.map(({ label, to }) => (
        <li key={label} className={styles.item}>
          <Icon name="arrow-right" className={styles.separator} />

          {to ? (
            <Link to={to} className={classNames(styles.link, 'text-txt')}>
              {label}
            </Link>
          ) : (
            <span
              className={classNames(styles.current, 'text-txt')}
              aria-current="page"
            >
              {label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

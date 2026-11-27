import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BannerItem } from '../../../../types/mainBanner';
import styles from './BannerSlide.module.scss';

type Props = BannerItem;

export const BannerSlide = ({ img, imgMob, title, subtitle, url }: Props) => (
  <article className={styles['banner-slide']}>
    <Link to={url} className={styles['image-link']} aria-label={title}>
      <picture className={styles.picture}>
        <source srcSet={img} media="(min-width: 640px)" />
        <img className={styles.image} src={imgMob} alt="" />
      </picture>
    </Link>

    <div className={styles.info}>
      <h2 className={classNames(styles.title, 'text-h2')}>{title}</h2>

      <p className={classNames(styles.subtitle, 'text-body')}>{subtitle}</p>

      <Link to={url} className={classNames(styles.link)}>
        Order Now
      </Link>
    </div>
  </article>
);

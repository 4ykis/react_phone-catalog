import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { BannerItem } from '../../../../types/mainBanner';
import styles from './HeroBanner.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import { Icon } from '../../../shared/Icon';
import { Link } from 'react-router-dom';

interface Props {
  items: BannerItem[];
}

const Arrow = ({ direction }: { direction: 'left' | 'right' }) => (
  <div className="arrow">
    <Icon name={`arrow-${direction}`} size="16" />
  </div>
);

export const HeroBanner = ({ items }: Props) => {
  return (
    <div className={styles.hero}>
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        aria-label="Previous slide"
      >
        <Arrow direction="left" />
      </button>

      <Swiper
        className={styles.banner}
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        loop
        navigation={{
          prevEl: `.${styles.prev}`,
          nextEl: `.${styles.next}`,
        }}
        pagination={{
          el: `.${styles.pagination}`,
          clickable: true,
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Link to={item.link}>
              <picture>
                <source srcSet={item.urlDesk} media="(min-width: 640px)" />
                <img
                  className={styles.image}
                  src={item.urlMob}
                  alt={item.alt}
                />
              </picture>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={`${styles.arrow} ${styles.next}`}
        aria-label="Next slide"
      >
        <Arrow direction="right" />
      </button>

      <div className={styles.pagination} />
    </div>
  );
};

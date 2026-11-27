import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { BannerItem } from '../../../../types/mainBanner';
import styles from './HeroBanner.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import { Button } from '../../../shared/Button';
import { Icon } from '../../../shared/Icon';
import { BannerSlide } from '../BannerSlide';

interface Props {
  items: BannerItem[];
}

export const HeroBanner = ({ items }: Props) => {
  return (
    <div className={styles.hero}>
      <Button
        palette="tertiary"
        className={`${styles.arrow} ${styles.prev}`}
        ariaLabel="Previous slide"
      >
        <Icon name="arrow-left" />
      </Button>

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
        {items.map(({ img, imgMob, title, subtitle, url }) => (
          <SwiperSlide key={url} className={styles.slide}>
            <BannerSlide
              img={img}
              imgMob={imgMob}
              title={title}
              subtitle={subtitle}
              url={url}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        palette="tertiary"
        className={`${styles.arrow} ${styles.next}`}
        ariaLabel="Next slide"
      >
        <Icon name="arrow-right" />
      </Button>

      <div className={styles.pagination} />
    </div>
  );
};

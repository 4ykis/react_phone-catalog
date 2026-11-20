import { RefObject, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ProductItem } from '../ProductItem';
import { Icon } from '../Icon';
import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';
import styles from './ProductSlider.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';

interface Props {
  title: string;
  slides: Product[];
  // details by id (matches Product.itemId)
  details: Record<string, ProductDetails>;
}

interface ArrowProps {
  direction: 'left' | 'right';
  className?: string;
  label: string;
  buttonRef: RefObject<HTMLButtonElement>;
}

const Arrow = ({ direction, className, label, buttonRef }: ArrowProps) => (
  <button
    ref={buttonRef}
    type="button"
    className={className}
    aria-label={label}
  >
    <Icon name={`arrow-${direction}`} />
  </button>
);

export const ProductSlider = ({ title, slides, details }: Props) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className="text-h2">{title}</h2>

        <div className={styles.controls}>
          <Arrow
            direction="left"
            buttonRef={prevRef}
            className={`${styles.arrow}`}
            label="Previous products"
          />
          <Arrow
            direction="right"
            buttonRef={nextRef}
            className={`${styles.arrow}`}
            label="Next products"
          />
        </div>
      </div>

      <Swiper
        className={styles.swiper}
        modules={[Navigation, FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode
        loop={false}
        navigation
        onBeforeInit={swiper => {
          const { navigation } = swiper.params;

          if (typeof navigation === 'object') {
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;
          }
        }}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 16,
            freeMode: false,
            loop: slides.length > 4,
          },
        }}
      >
        {slides.map(product => (
          <SwiperSlide key={product.id} className={styles.slide}>
            <ProductItem product={product} details={details[product.itemId]} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

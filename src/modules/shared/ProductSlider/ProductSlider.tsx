import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ProductItem } from '../ProductItem';
import { Button } from '../Button';
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
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const Arrow = ({ direction, label, disabled, onClick }: ArrowProps) => (
  <Button
    palette="tertiary"
    size="sm"
    isIcon
    ariaLabel={label}
    disabled={disabled}
    onClick={onClick}
  >
    <Icon name={`arrow-${direction}`} />
  </Button>
);

export const ProductSlider = ({ title, slides, details }: Props) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncEdges = (instance: SwiperType) => {
    // A looping slider never reaches an edge
    const { loop } = instance.params;

    setIsBeginning(!loop && instance.isBeginning);
    setIsEnd(!loop && instance.isEnd);
  };

  return (
    <section className={styles.slider}>
      <div className={styles.header}>
        <h2 className="text-h2">{title}</h2>

        <div className={styles.controls}>
          <Arrow
            direction="left"
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
            label="Previous products"
          />
          <Arrow
            direction="right"
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
            label="Next products"
          />
        </div>
      </div>

      <Swiper
        className={styles.swiper}
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode
        loop={false}
        onSwiper={instance => {
          setSwiper(instance);
          syncEdges(instance);
        }}
        onProgress={syncEdges}
        onBreakpoint={syncEdges}
        breakpoints={{
          1199: {
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

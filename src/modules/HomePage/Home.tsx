import { useEffect, useMemo, useState } from 'react';
import styles from './Home.module.scss';
import { HeroBanner } from './components/HeroBanner';
import { BannerItem } from '../../types/mainBanner';
import { ProductSlider } from '../shared/ProductSlider';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getProductDetails,
  getProducts,
} from '../../utils/products';

const mainBannerItems: BannerItem[] = [
  {
    urlDesk: 'img/main-banner/banner-desktop.png',
    urlMob: 'img/main-banner/banner-mobile.png',
    alt: 'Now available in our store! iPhone 14 Pro',
    link: '/phones',
  },
  {
    urlDesk: 'img/main-banner/banner-desktop.png',
    urlMob: 'img/main-banner/banner-mobile.png',
    alt: 'Now available in our store! iPhone 14 Pro',
    link: '/phones',
  },
  {
    urlDesk: 'img/main-banner/banner-desktop.png',
    urlMob: 'img/main-banner/banner-mobile.png',
    alt: 'Now available in our store! iPhone 14 Pro',
    link: '/phones',
  },
];

const MAX_SLIDES = 12;

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [details, setDetails] = useState<Record<string, ProductDetails>>({});

  useEffect(() => {
    getProductDetails()
      .then(setDetails)
      .catch(() => setDetails({}));
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const brandNewSlides = useMemo(
    () => getBrandNewProducts(products).slice(0, MAX_SLIDES),
    [products],
  );
  const hotPriceSlides = useMemo(
    () => getHotPriceProducts(products).slice(0, MAX_SLIDES),
    [products],
  );

  return (
    <div className={styles['home-page']}>
      <h1 className="hidden">Product Catalog</h1>

      <div className={styles['home-page-banner']}>
        <div className="text-h1">Welcome to Nice Gadgets store!</div>

        <HeroBanner items={mainBannerItems} />
      </div>

      <div className={styles['home-page-slider']}>
        <ProductSlider
          title="Brand new models"
          slides={brandNewSlides}
          details={details}
        />
      </div>

      <div className={styles['home-page-slider']}>
        <ProductSlider
          title="Hot prices"
          slides={hotPriceSlides}
          details={details}
        />
      </div>
    </div>
  );
};

import { useEffect, useMemo, useState } from 'react';
import styles from './Home.module.scss';
import { HeroBanner } from './components/HeroBanner';
import { BannerItem } from '../../types/mainBanner';
import { ProductSlider } from '../shared/ProductSlider';
import { Product } from '../../types/Product';
import {
  getBrandNewProducts,
  getHotPriceProducts,
  getCategories,
  getProducts,
} from '../../utils/products';
import { Category } from './components/Category/Category';

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  const brandNewSlides = useMemo(
    () => getBrandNewProducts(products).slice(0, MAX_SLIDES),
    [products],
  );
  const hotPriceSlides = useMemo(
    () => getHotPriceProducts(products).slice(0, MAX_SLIDES),
    [products],
  );

  const categories = useMemo(() => getCategories(products), [products]);

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
          isLoading={isLoading}
        />
      </div>

      <div className={styles['home-page-categories']}>
        {categories.map(cat => (
          <Category key={cat.name} category={cat} />
        ))}
      </div>

      <div className={styles['home-page-slider']}>
        <ProductSlider
          title="Hot prices"
          slides={hotPriceSlides}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

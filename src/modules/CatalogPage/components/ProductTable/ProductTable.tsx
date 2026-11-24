import { ProductItem } from '../../../shared/ProductItem';
import { ProductSkeleton } from '../../../shared/ProductSkeleton';
import { Product } from '../../../../types/Product';
import styles from './ProductTable.module.scss';

interface Props {
  products?: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export const ProductTable = ({
  products = [],
  isLoading = false,
  skeletonCount = 8,
}: Props) => {
  const skeletons = Array.from({ length: skeletonCount }, (_, i) => i);

  return (
    <ul className={styles.table} aria-busy={isLoading}>
      {isLoading &&
        skeletons.map(i => (
          <li key={i} className={styles.cell}>
            <ProductSkeleton />
          </li>
        ))}
      {!isLoading &&
        products.map(product => (
          <li key={product.id} className={styles.cell}>
            <ProductItem product={product} />
          </li>
        ))}
    </ul>
  );
};

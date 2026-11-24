import styles from './ProductSkeleton.module.scss';

export const ProductSkeleton = () => (
  <div className={styles.card} aria-hidden="true" />
);

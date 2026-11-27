import classNames from 'classnames';
import { Button } from '../../../shared/Button';
import styles from './ProductCheckout.module.scss';

interface Props {
  totalPrice: number;
  totalCount: number;
  className?: string;
  onCheckout?: () => void;
}

export const ProductCheckout = ({
  totalPrice,
  totalCount,
  className,
  onCheckout,
}: Props) => (
  <section className={classNames(styles.checkout, className)}>
    <div className={styles.total}>
      <p className={classNames(styles.total__price, 'text-h1')}>
        ${totalPrice}
      </p>

      <p className={classNames(styles.total__text, 'text-body')}>
        Total for {totalCount} {totalCount === 1 ? 'product' : 'products'}
      </p>
    </div>

    <hr className={styles.line} />

    <Button size="lg" fullWidth onClick={onCheckout}>
      Checkout
    </Button>
  </section>
);

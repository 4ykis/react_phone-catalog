import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { CartItem } from '../../../../types/Product';
import { useStore } from '../../../../store/Store';
import { Button } from '../../../shared/Button';
import { Icon } from '../../../shared/Icon';
import styles from './ProductItem.module.scss';

interface Props {
  item: CartItem;
}

export const ProductItem = ({ item }: Props) => {
  const { itemId, name, image, price, quantity } = item;
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useStore();

  return (
    <article className={styles.item}>
      <div className={styles.info}>
        <button
          type="button"
          className={styles.remove}
          aria-label={`Remove ${name} from cart`}
          onClick={() => removeFromCart(itemId)}
        >
          <Icon name="close" />
        </button>

        <Link to={`/product/${itemId}`} className={styles.image}>
          <img className={styles.image__img} src={image} alt={name} />
        </Link>

        <Link
          to={`/product/${itemId}`}
          className={classNames(styles.name, 'text-body')}
        >
          {name}
        </Link>
      </div>

      <div className={styles.purchase}>
        <div className={styles.counter}>
          <Button
            palette="tertiary"
            size="sm"
            isIcon
            ariaLabel="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => decreaseQuantity(itemId)}
          >
            <Icon name="minus" />
          </Button>

          <span
            className={classNames(styles.counter__value, 'text-btn')}
            aria-live="polite"
          >
            {quantity}
          </span>

          <Button
            palette="tertiary"
            size="sm"
            isIcon
            ariaLabel="Increase quantity"
            onClick={() => increaseQuantity(itemId)}
          >
            <Icon name="plus" />
          </Button>
        </div>

        <div className={classNames(styles.price, 'text-h3')}>${price}</div>
      </div>
    </article>
  );
};

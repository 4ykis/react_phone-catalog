import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { ProductDetails } from '../../../types/ProductDetails';
import styles from './ProductItem.module.scss';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useStore } from '../../../store/Store';

interface Props {
  product: Product;
  details?: ProductDetails;
}

export const ProductItem = ({ product, details }: Props) => {
  const { name, image, fullPrice, price, screen, capacity, ram } = product;

  const { toggleCart, toggleFavorite, isInCart, isFavorite } = useStore();
  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <article className={styles.product}>
      <div className={styles['product-image']}>
        <img className={styles['product-image__img']} src={image} alt={name} />
      </div>
      <h3 className={classNames(styles['product-title'], 'text-body')}>
        {name}
      </h3>

      <div className={classNames(styles['product-price'], 'text-h3')}>
        <span>${price}</span>{' '}
        <s className={styles['product-price-old']}>${fullPrice}</s>
      </div>

      <dl className={styles['product-details']}>
        <dt>Screen</dt>
        <dd>{screen}</dd>
        <dt>Capacity</dt>
        <dd>{capacity}</dd>
        <dt>RAM</dt>
        <dd>{ram}</dd>
        {details && (
          <>
            <dt>Processor</dt>
            <dd>{details.processor}</dd>
          </>
        )}
      </dl>

      <div className={styles['product-controls']}>
        <Button
          palette={inCart ? 'secondary' : 'primary'}
          onClick={() => toggleCart(product)}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </Button>
        <a
          onClick={handleToggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          href="#"
          className="product-controls__favorite"
        >
          <Icon name={favorite ? 'heart-filled' : 'heart'} />
        </a>
      </div>
    </article>
  );
};

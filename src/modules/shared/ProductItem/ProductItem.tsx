import classNames from 'classnames';
import { Link } from 'react-router-dom';
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

export const ProductItem = ({ product }: Props) => {
  const { itemId, name, image, fullPrice, price, screen, capacity, ram } =
    product;

  const { toggleCart, toggleFavorite, isInCart, isFavorite } = useStore();
  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  const productLink = `/product/${itemId}`;

  return (
    <article className={styles.product}>
      <div className={styles['product-image']}>
        <Link to={productLink}>
          <img
            className={styles['product-image__img']}
            src={image}
            alt={name}
          />
        </Link>
      </div>
      <div className={styles['product-content']}>
        <Link
          to={productLink}
          className={classNames(styles['product-title'], 'text-body')}
        >
          {name}
        </Link>

        <div className={classNames(styles['product-price'], 'text-h3')}>
          <span>${price}</span>{' '}
          <s className={classNames(styles['product-price__old'])}>
            ${fullPrice}
          </s>
        </div>

        <dl className={classNames(styles['product-details'], 'text-txt')}>
          <dt>Screen</dt>
          <dd>{screen}</dd>
          <dt>Capacity</dt>
          <dd>{capacity}</dd>
          <dt>RAM</dt>
          <dd>{ram}</dd>
        </dl>

        <div className={styles['product-controls']}>
          <Button
            isSelected={inCart}
            palette="primary"
            onClick={() => toggleCart(product)}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </Button>
          <a
            onClick={handleToggleFavorite}
            aria-pressed={favorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            href="#"
            className={classNames(styles['product-controls__favorite'], {
              [styles['product-controls__favorite--selected']]: favorite,
            })}
          >
            <Icon name={favorite ? 'heart-filled' : 'heart'} />
          </a>
        </div>
      </div>
    </article>
  );
};

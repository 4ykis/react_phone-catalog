import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../../types/Product';
import styles from './ProductItem.module.scss';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { useStore } from '../../../store/Store';

interface Props {
  product: Product;
}

export const ProductItem = ({ product }: Props) => {
  const { itemId, name, image, fullPrice, price, screen, capacity, ram } =
    product;

  const { pathname, search } = useLocation();
  const { toggleCart, toggleFavorite, isInCart, isFavorite } = useStore();
  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);

  const productLink = `/product/${itemId}`;

  return (
    <article className={styles.product}>
      <div className={styles['product-image']}>
        <Link to={productLink} state={{ from: { pathname, search } }}>
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
          state={{ from: { pathname, search } }}
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
          <Button
            palette="tertiary"
            isIcon
            isSelected={favorite}
            ariaLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(product)}
          >
            <Icon name={favorite ? 'heart-filled' : 'heart'} />
          </Button>
        </div>
      </div>
    </article>
  );
};

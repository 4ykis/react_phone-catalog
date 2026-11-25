import classNames from 'classnames';
import { Button } from '../../../shared/Button';
import { Icon } from '../../../shared/Icon';
import { useStore } from '../../../../store/Store';
import { toProduct } from '../../../../utils/products';
import { ProductDetails } from '../../../../types/ProductDetails';
import styles from './Details.module.scss';

type VariantKey = 'capacity' | 'color';

export type VariantChanges = Partial<Pick<ProductDetails, VariantKey>>;

interface Props {
  details: ProductDetails;
  onVariantChange: (changes: VariantChanges) => void;
  className?: string;
}

// "space gray" / "space-gray" -> "color-spacegray"
const getColorClass = (color: string) => `color-${color.replace(/[\s-]/g, '')}`;

export const Details = ({ details, onVariantChange, className }: Props) => {
  const { toggleCart, toggleFavorite, isInCart, isFavorite } = useStore();

  const {
    productId,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
  } = details;

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
  ];

  const product = toProduct(details);
  const inCart = isInCart(product.itemId);
  const favorite = isFavorite(product.itemId);

  return (
    <section className={classNames(styles['details-wrapper'], className)}>
      <div className={classNames(styles.details, className)}>
        <div className={styles.option}>
          <p className={classNames(styles['option-label'], 'text-txt')}>
            Available colors
            <span
              className={classNames(styles['product-id'], 'text-txt text-bold')}
            >
              ID: {productId}
            </span>
          </p>

          <ul className={styles.list}>
            {colorsAvailable.map(item => (
              <li key={item}>
                <button
                  type="button"
                  aria-label={item}
                  aria-pressed={item === color}
                  className={classNames(styles.color, {
                    [styles['color--active']]: item === color,
                  })}
                  onClick={() => onVariantChange({ color: item })}
                >
                  <span className={getColorClass(item)} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.option}>
          <p className={classNames(styles['option-label'], 'text-txt')}>
            Select capacity
          </p>

          <ul className={styles.list}>
            {capacityAvailable.map(item => (
              <li key={item}>
                <button
                  type="button"
                  aria-pressed={item === capacity}
                  className={classNames(styles.capacity, 'text-txt', {
                    [styles['capacity--active']]: item === capacity,
                  })}
                  onClick={() => onVariantChange({ capacity: item })}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={classNames(styles.price, 'text-h1')}>
          <span>${priceDiscount}</span>
          <s
            className={classNames(styles['price-old'], 'text-h2 text-semibold')}
          >
            ${priceRegular}
          </s>
        </div>

        <div className={styles.controls}>
          <Button
            isSelected={inCart}
            palette="primary"
            size="lg"
            fullWidth
            onClick={() => toggleCart(product)}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </Button>

          <Button
            palette="tertiary"
            size="lg"
            isIcon
            isSelected={favorite}
            ariaLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => toggleFavorite(product)}
          >
            <Icon name={favorite ? 'heart-filled' : 'heart'} />
          </Button>
        </div>

        <dl className={classNames(styles.specs, 'text-txt')}>
          {specs.map(({ label, value }) => (
            <div key={label} className={styles.spec}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useStore } from '../../store/Store';
import { Icon } from '../shared/Icon';
import { ProductCheckout } from './components/ProductCheckout';
import { ProductItem } from './components/ProductItem';
import styles from './Cart.module.scss';

export const Cart = () => {
  const navigate = useNavigate();
  const { key } = useLocation();
  const { cart } = useStore();

  // 'default' is the key of the first history entry: the user landed here
  // directly (e.g. from another site), so there is no in-app page to go back to
  const handleBack = () => {
    if (key === 'default') {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  const totalCount = cart.reduce((sum, { quantity }) => sum + quantity, 0);
  const totalPrice = cart.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0,
  );

  return (
    <div className={styles.cart}>
      <button
        type="button"
        className={classNames(styles.back, 'text-txt')}
        onClick={handleBack}
      >
        <Icon name="arrow-left" />
        Back
      </button>

      <h1 className={classNames(styles.title, 'text-h1')}>Cart</h1>

      {cart.length === 0 ? (
        <p className="text-body">Your cart is empty</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.list}>
            {cart.map(item => (
              <ProductItem key={item.itemId} item={item} />
            ))}
          </div>

          <ProductCheckout
            className={styles.checkout}
            totalPrice={totalPrice}
            totalCount={totalCount}
          />
        </div>
      )}
    </div>
  );
};

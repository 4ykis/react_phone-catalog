import { createContext, useCallback, useContext, useMemo } from 'react';
import { CartItem, Product } from '../types/Product';
import { useLocalStorage } from '../utils/useLocalStorage';

interface StoreContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  toggleCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (itemId: string) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (itemId: string) => boolean;
  isFavorite: (itemId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedCart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  // Carts saved before quantities existed have no quantity: treat it as 1
  const cart = useMemo(
    () => storedCart.map(item => ({ ...item, quantity: item.quantity ?? 1 })),
    [storedCart],
  );

  const addToCart = useCallback(
    (product: Product) =>
      setCart(current =>
        current.some(item => item.itemId === product.itemId)
          ? current
          : [...current, { ...product, quantity: 1 }],
      ),
    [setCart],
  );

  const changeQuantity = useCallback(
    (itemId: string, step: number) =>
      setCart(current =>
        current.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: Math.max(1, (item.quantity ?? 1) + step) }
            : item,
        ),
      ),
    [setCart],
  );

  const increaseQuantity = useCallback(
    (itemId: string) => changeQuantity(itemId, 1),
    [changeQuantity],
  );

  const decreaseQuantity = useCallback(
    (itemId: string) => changeQuantity(itemId, -1),
    [changeQuantity],
  );

  const removeFromCart = useCallback(
    (itemId: string) =>
      setCart(current => current.filter(item => item.itemId !== itemId)),
    [setCart],
  );

  const addToFavorites = useCallback(
    (product: Product) =>
      setFavorites(current =>
        current.some(item => item.itemId === product.itemId)
          ? current
          : [...current, product],
      ),
    [setFavorites],
  );

  const removeFromFavorites = useCallback(
    (itemId: string) =>
      setFavorites(current => current.filter(item => item.itemId !== itemId)),
    [setFavorites],
  );

  const value = useMemo<StoreContextType>(() => {
    const isInCart = (itemId: string) =>
      cart.some(item => item.itemId === itemId);
    const isFavorite = (itemId: string) =>
      favorites.some(item => item.itemId === itemId);

    return {
      cart,
      favorites,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      toggleCart: product =>
        isInCart(product.itemId)
          ? removeFromCart(product.itemId)
          : addToCart(product),
      addToFavorites,
      removeFromFavorites,
      toggleFavorite: product =>
        isFavorite(product.itemId)
          ? removeFromFavorites(product.itemId)
          : addToFavorites(product),
      isInCart,
      isFavorite,
    };
  }, [
    cart,
    favorites,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    addToFavorites,
    removeFromFavorites,
  ]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }

  return context;
};

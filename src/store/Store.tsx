import { createContext, useCallback, useContext, useMemo } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../utils/useLocalStorage';

interface StoreContextType {
  cart: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (itemId: string) => void;
  toggleCart: (product: Product) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (itemId: string) => void;
  toggleFavorite: (product: Product) => void;
  isInCart: (itemId: string) => boolean;
  isFavorite: (itemId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>('favorites', []);

  const addToCart = useCallback(
    (product: Product) =>
      setCart(current =>
        current.some(item => item.itemId === product.itemId)
          ? current
          : [...current, product],
      ),
    [setCart],
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

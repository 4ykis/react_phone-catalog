import { ProductDetails } from './ProductDetails';

// public/api/accessories.json (no camera / zoom)
export interface Accessory extends ProductDetails {
  category: 'accessories';
}

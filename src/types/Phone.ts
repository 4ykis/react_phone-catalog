import { ProductDetails } from './ProductDetails';

// public/api/phones.json
export interface Phone extends ProductDetails {
  category: 'phones';
  camera: string;
  zoom: string;
}

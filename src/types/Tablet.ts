import { ProductDetails } from './ProductDetails';

// public/api/tablets.json
export interface Tablet extends ProductDetails {
  category: 'tablets';
  camera: string;
  zoom: string;
}

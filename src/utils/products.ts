import { CategoryInfo } from '../types/Category';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = (): Promise<Product[]> =>
  fetch('api/products.json').then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status}`);
    }

    return response.json();
  });

const getDiscount = ({ fullPrice, price }: Product) => fullPrice - price;

const byDiscountDesc = (a: Product, b: Product) => {
  return getDiscount(b) - getDiscount(a);
};

export const getBrandNewProducts = (products: Product[]): Product[] => {
  const newestYear = Math.max(...products.map(({ year }) => year));

  return products.filter(({ year }) => year === newestYear);
};

export const getCategories = (products: Product[]): CategoryInfo[] =>
  products
    .map(({ category }) => category)
    .filter((category, index, all) => all.indexOf(category) === index)
    .map(name => ({
      name,
      img: `img/category-${name}.png`,
      link: `/${name}`,
      items: products.filter(({ category }) => category === name).length,
    }));

export const getHotPriceProducts = (products: Product[]): Product[] =>
  [...products].sort(byDiscountDesc);

const loadJson = <T>(url: string): Promise<T> =>
  fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }

    return response.json();
  });

type DetailsMap = Record<string, ProductDetails>;

export const getProductDetails = async (): Promise<DetailsMap> => {
  const lists = await Promise.all([
    loadJson<ProductDetails[]>('api/phones.json'),
    loadJson<ProductDetails[]>('api/tablets.json'),
    loadJson<ProductDetails[]>('api/accessories.json'),
  ]);

  return Object.fromEntries(lists.flat().map(item => [item.id, item]));
};

export type SortType = 'newest' | 'alphabetically' | 'cheapest';

export const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

export const DEFAULT_SORT: SortType = 'newest';

export const isSortType = (value: string | null): value is SortType =>
  SORT_OPTIONS.some(option => option.value === value);

export const getProductsByCategory = (
  products: Product[],
  category: string,
): Product[] => products.filter(product => product.category === category);

export const sortProducts = (
  products: Product[],
  sort: SortType,
): Product[] => {
  const sorted = [...products];

  switch (sort) {
    case 'alphabetically':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'cheapest':
      return sorted.sort((a, b) => a.price - b.price);
    case 'newest':
    default:
      return sorted.sort((a, b) => b.year - a.year || b.id - a.id);
  }
};

// Window of page numbers: previous, current and two next ones (max 4).
// Near the edges the window shifts so that it keeps its size.
export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  size = 4,
): number[] => {
  const count = Math.min(size, totalPages);
  const start = Math.max(1, Math.min(currentPage - 1, totalPages - count + 1));

  return Array.from({ length: count }, (_, index) => start + index);
};

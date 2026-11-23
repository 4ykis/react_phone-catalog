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

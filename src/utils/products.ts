import { CategoryInfo } from '../types/Category';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

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

type RawDetails = Omit<ProductDetails, 'productId' | 'year'>;

// Color names and some ids are written inconsistently across the files,
// so items are matched by "model + capacity + color" without spaces/dashes
const normalize = (value: string) => value.toLowerCase().replace(/[\s-]/g, '');

// The details files are the source of truth. products.json only adds
// the numeric id and the release year.
export const getAllDetails = async (): Promise<ProductDetails[]> => {
  const [phones, tablets, accessories, products] = await Promise.all([
    loadJson<RawDetails[]>('api/phones.json'),
    loadJson<RawDetails[]>('api/tablets.json'),
    loadJson<RawDetails[]>('api/accessories.json'),
    loadJson<Product[]>('api/products.json'),
  ]);

  const extras = new Map(
    products.map(({ itemId, id, year }) => [normalize(itemId), { id, year }]),
  );

  return [...phones, ...tablets, ...accessories].map(item => {
    const extra = extras.get(
      normalize(`${item.namespaceId}${item.capacity}${item.color}`),
    );

    return { ...item, productId: extra?.id ?? 0, year: extra?.year ?? 0 };
  });
};

export const toProduct = (details: ProductDetails): Product => ({
  id: details.productId,
  category: details.category,
  itemId: details.id,
  name: details.name,
  fullPrice: details.priceRegular,
  price: details.priceDiscount,
  screen: details.screen,
  capacity: details.capacity,
  color: details.color,
  ram: details.ram,
  year: details.year,
  image: details.images[0],
});

export const getProducts = async (): Promise<Product[]> =>
  (await getAllDetails()).map(toProduct);

export const getProductDetails = async (): Promise<DetailsMap> => {
  const all = await getAllDetails();

  return Object.fromEntries(all.map(item => [item.id, item]));
};

// Finds the variant of the same model with the given capacity / color.
// Ids are not built from the attributes, because some of them are irregular.
export const findVariant = (
  all: ProductDetails[],
  current: ProductDetails,
  changes: Partial<Pick<ProductDetails, 'capacity' | 'color'>>,
): ProductDetails | undefined => {
  const target = {
    capacity: current.capacity,
    color: current.color,
    ...changes,
  };

  return all.find(
    item =>
      item.namespaceId === current.namespaceId &&
      item.capacity === target.capacity &&
      normalize(item.color) === normalize(target.color),
  );
};

export const getRecommended = (
  products: Product[],
  current: Product,
  limit = 12,
): Product[] =>
  products
    .filter(
      ({ category, itemId }) =>
        category === current.category && itemId !== current.itemId,
    )
    .sort((a, b) => b.year - a.year || b.price - a.price)
    .slice(0, limit);

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

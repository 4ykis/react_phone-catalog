import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Pagination } from '../shared/Pagination';
import { ProductFilter, PER_PAGE_OPTIONS } from './components/ProductFilter';
import { ProductTable } from './components/ProductTable';
import { useStore } from '../../store/Store';
import { Product } from '../../types/Product';
import {
  DEFAULT_SORT,
  SortType,
  getProducts,
  getProductsByCategory,
  isSortType,
  sortProducts,
} from '../../utils/products';
import { scrollToTop } from '../../utils/scrollToTop';
import styles from './Catalog.module.scss';

const DEFAULT_PER_PAGE = '16';

const TITLES: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favourites',
};

const BREADCRUMBS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favorites: 'Favourites',
};

export const Catalog = ({ type }: { type: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isFavorites = type === 'favorites';

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getProducts()
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sortParam = searchParams.get('sort');
  const perPageParam = searchParams.get('perPage');
  const pageParam = Number(searchParams.get('page'));

  const sort: SortType = isSortType(sortParam) ? sortParam : DEFAULT_SORT;
  const perPage = PER_PAGE_OPTIONS.includes(perPageParam ?? '')
    ? (perPageParam as string)
    : DEFAULT_PER_PAGE;

  const sortedProducts = useMemo(
    () =>
      sortProducts(
        isFavorites ? favorites : getProductsByCategory(products, type),
        sort,
      ),
    [products, favorites, isFavorites, type, sort],
  );

  const total = sortedProducts.length;
  const itemsPerPage = perPage === 'all' ? total : Number(perPage);
  const totalPages = itemsPerPage ? Math.ceil(total / itemsPerPage) : 1;
  const currentPage = Math.min(
    Math.max(Number.isInteger(pageParam) ? pageParam : 1, 1),
    Math.max(totalPages, 1),
  );

  const visibleProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Keeps the URL clean: default values are not written to the query string
  const updateParams = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const handleSortChange = (value: SortType) =>
    updateParams({
      sort: value === DEFAULT_SORT ? null : value,
      page: null,
    });

  const handlePerPageChange = (value: string) =>
    updateParams({
      perPage: value === DEFAULT_PER_PAGE ? null : value,
      page: null,
    });

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
    scrollToTop();
  };

  const title = TITLES[type] ?? type;

  return (
    <div className={styles.catalog}>
      <Breadcrumbs items={[{ label: BREADCRUMBS[type] ?? title }]} />

      <div className={styles.heading}>
        <h1 className="text-h1">{title}</h1>

        {!isLoading && !hasError && (
          <p className={classNames(styles.count, 'text-body')}>
            {total} {total === 1 ? 'model' : 'models'}
          </p>
        )}
      </div>

      {isLoading && <ProductTable isLoading />}

      {hasError && (
        <p className="text-body">
          Something went wrong. Please try again later.
        </p>
      )}

      {!isLoading && !hasError && total === 0 && (
        <p className="text-body">
          {isFavorites
            ? 'You have no favourite products yet'
            : 'There are no products in this category'}
        </p>
      )}

      {!isLoading && !hasError && total > 0 && (
        <>
          <ProductFilter
            sort={sort}
            perPage={perPage}
            onSortChange={handleSortChange}
            onPerPageChange={handlePerPageChange}
          />

          <ProductTable products={visibleProducts} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

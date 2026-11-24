import { Select } from '../../../shared/Select';
import { SORT_OPTIONS, SortType, isSortType } from '../../../../utils/products';
import styles from './ProductFilter.module.scss';

export const PER_PAGE_OPTIONS = ['4', '8', '16', 'all'];

interface Props {
  sort: SortType;
  perPage: string;
  onSortChange: (sort: SortType) => void;
  onPerPageChange: (perPage: string) => void;
}

export const ProductFilter = ({
  sort,
  perPage,
  onSortChange,
  onPerPageChange,
}: Props) => (
  <div className={styles.filter}>
    <Select
      label="Sort by"
      value={sort}
      options={SORT_OPTIONS}
      onChange={value => isSortType(value) && onSortChange(value)}
    />

    <Select
      label="Items on page"
      value={perPage}
      options={PER_PAGE_OPTIONS.map(value => ({
        value,
        label: value === 'all' ? 'All' : value,
      }))}
      onChange={onPerPageChange}
    />
  </div>
);

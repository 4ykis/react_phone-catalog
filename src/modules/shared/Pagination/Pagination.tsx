import { Button } from '../Button';
import { Icon } from '../Icon';
import { getVisiblePages } from '../../../utils/products';
import styles from './Pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className={styles.pagination}>
      <Button
        palette="tertiary"
        isIcon
        ariaLabel="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Icon name="arrow-left" />
      </Button>

      {pages.map(page => (
        <Button
          key={page}
          palette="secondary"
          isIcon
          isSelected={page === currentPage}
          ariaLabel={`Page ${page}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        palette="tertiary"
        isIcon
        ariaLabel="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Icon name="arrow-right" />
      </Button>
    </nav>
  );
};

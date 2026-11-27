import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Icon } from '../shared/Icon';
import { NotFoundState } from '../shared/NotFoundState';
import { ProductSlider } from '../shared/ProductSlider';
import { ProductDetails } from '../../types/ProductDetails';
import {
  findVariant,
  getAllDetails,
  getRecommended,
  toProduct,
} from '../../utils/products';
import { Details, VariantChanges } from './components/Details';
import { Gallery } from './components/Gallery';
import { ProductInfo } from './components/ProductInfo';
import styles from './Product.module.scss';

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [allDetails, setAllDetails] = useState<ProductDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getAllDetails()
      .then(setAllDetails)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const details = allDetails.find(item => item.id === id);

  const recommended = useMemo(
    () =>
      details
        ? getRecommended(allDetails.map(toProduct), toProduct(details))
        : [],
    [allDetails, details],
  );

  if (isLoading) {
    return (
      <div className={styles.product}>
        <p className="text-body" aria-busy="true">
          Loading...
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.product}>
        <p className="text-body">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  if (!details) {
    return <NotFoundState title="Product was not found" />;
  }

  const { name, category, images } = details;

  const categoryPath = `/${category}`;
  const backLink =
    state?.from?.pathname === categoryPath
      ? `${categoryPath}${state.from.search}`
      : categoryPath;

  const openVariant = (changes: VariantChanges) => {
    const variant = findVariant(allDetails, details, changes);

    if (variant) {
      navigate(`/product/${variant.id}`, { replace: true, state });
    }
  };

  return (
    <div className={styles['product-container']}>
      <Breadcrumbs
        items={[
          { label: CATEGORY_LABELS[category] ?? category, to: `/${category}` },
          { label: name },
        ]}
      />

      <Link to={backLink} className={classNames(styles.back, 'text-txt')}>
        <Icon name="arrow-left" />
        Back
      </Link>

      <h1 className={classNames(styles.title, 'text-h1')}>{name}</h1>

      <div className={styles.product}>
        <Gallery
          key={details.id}
          images={images}
          name={name}
          className={styles.gallery}
        />

        <Details
          details={details}
          onVariantChange={openVariant}
          className={styles.details}
        />

        <ProductInfo details={details} type="about" className={styles.about} />

        <ProductInfo
          details={details}
          type="specs"
          className={styles.techspec}
        />
      </div>

      {recommended.length > 0 && (
        <div className={styles.recommended}>
          <ProductSlider title="You may also like" slides={recommended} />
        </div>
      )}
    </div>
  );
};

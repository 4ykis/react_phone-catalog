import classNames from 'classnames';
import styles from './Category.module.scss';
import { CategoryInfo } from '../../../../types/Category';

interface Props {
  category: CategoryInfo;
}

export const Category = ({ category }: Props) => {
  return (
    <article key={category.name}>
      <a className={styles.category} href={category.link}>
        <div className={styles['category-img-container']}>
          <img
            className={styles['category-img']}
            src={category.img}
            alt={category.name}
          />
        </div>
        <h4 className={classNames(styles['category-title'], 'text-h3')}>
          {category.name}
        </h4>
        <p className={classNames(styles['category-text'], 'text-body')}>
          {category.items} models
        </p>
      </a>
    </article>
  );
};

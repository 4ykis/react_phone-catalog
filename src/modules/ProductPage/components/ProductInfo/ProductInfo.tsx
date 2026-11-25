import classNames from 'classnames';
import { ProductDetails } from '../../../../types/ProductDetails';
import styles from './ProductInfo.module.scss';

interface Props {
  details: ProductDetails;
  // which block of the product info to show
  type: 'about' | 'specs';
  className?: string;
}

const TITLES = {
  about: 'About',
  specs: 'Tech specs',
};

export const ProductInfo = ({ details, type, className }: Props) => {
  const {
    description,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell,
  } = details;

  const specs = [
    { label: 'Screen', value: screen },
    { label: 'Resolution', value: resolution },
    { label: 'Processor', value: processor },
    { label: 'RAM', value: ram },
    { label: 'Built in memory', value: capacity },
    ...(camera ? [{ label: 'Camera', value: camera }] : []),
    ...(zoom ? [{ label: 'Zoom', value: zoom }] : []),
    { label: 'Cell', value: cell.join(', ') },
  ];

  return (
    <section
      className={classNames(styles.info, styles[`info--${type}`], className)}
    >
      <h2 className={classNames(styles.heading, 'text-h3')}>{TITLES[type]}</h2>

      {type === 'about' &&
        description.map(block => (
          <article key={block.title} className={styles.article}>
            <h3 className="text-h4">{block.title}</h3>

            {block.text.map(paragraph => (
              <p key={paragraph} className="text-body">
                {paragraph}
              </p>
            ))}
          </article>
        ))}

      {type === 'specs' && (
        <dl className={classNames(styles.specs, 'text-body')}>
          {specs.map(({ label, value }) => (
            <div key={label} className={styles.spec}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
};

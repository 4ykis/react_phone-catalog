import { useState } from 'react';
import classNames from 'classnames';
import styles from './Gallery.module.scss';

interface Props {
  images: string[];
  name: string;
  className?: string;
}

// Remount it with a new `key` to show the first image again
export const Gallery = ({ images, name, className }: Props) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className={classNames(styles.gallery, className)}>
      <div className={styles.thumbs}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-pressed={index === activeImage}
            className={classNames(styles.thumb, {
              [styles['thumb--active']]: index === activeImage,
            })}
            onClick={() => setActiveImage(index)}
          >
            <img src={src} alt="" />
          </button>
        ))}
      </div>

      <div className={styles.photo}>
        <img src={images[activeImage]} alt={name} />
      </div>
    </section>
  );
};

import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../Button';
import styles from './NotFoundState.module.scss';

interface Props {
  title: string;
}

export const NotFoundState = ({ title }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found']}>
      <h1 className={classNames(styles.title, 'text-h2')}>{title}</h1>

      <img
        className={styles.image}
        src="img/page-not-found.png"
        alt="Page not found illustration"
      />

      <Button size="lg" onClick={() => navigate('/')}>
        Back to home
      </Button>
    </div>
  );
};

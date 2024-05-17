import styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <>
      <div
        className={styles.mapContainer}
        onClick={() => {
          navigate('form');
        }}
      >
        <h1>
          Position: {lat}, {lng}
        </h1>
        <button onClick={() => setSearchParams({ lat: 23, lng: 56 })}>
          Change query strings
        </button>
      </div>
    </>
  );
}

export default Map;

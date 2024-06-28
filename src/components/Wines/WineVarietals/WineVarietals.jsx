import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './WineVarietals.css';
import WineVarietalsList from '../WineVarietalsList/WineVarietalsList';

import WineSearch from '../WineSearch/WineSearch';

export default function WineVarietals() {
  const varietals = useSelector((store) => store.varietals);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_WINES' });
    dispatch({ type: 'FETCH_VARIETALS' });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='wine-page'>
      <div className='container'>
        <div className='wine-header'>
          <h6 onClick={() => history.push('/home')} className='home-button'>
            Home
          </h6>
          <h3>Wine Varietals</h3>
          <h6 onClick={() => history.push('/wineform')}>Add</h6>
        </div>
        <WineSearch />
        <ul className='wine-varietals-list'>
          {varietals.map((varietal) => (
            <WineVarietalsList key={varietal.id} varietal={varietal} />
          ))}
        </ul>
        <div className='out-stock-button'>
          <button
            className='btn btn-outline-secondary'
            onClick={() => history.push(`/winesoutofstock`)}
          >
            View Out of Stock Wines
          </button>
        </div>
      </div>
    </div>
  );
}

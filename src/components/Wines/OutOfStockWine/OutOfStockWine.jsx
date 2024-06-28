import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OutOfStockWine.css';

export default function OutOfStockWine() {
  const dispatch = useDispatch();
  const history = useHistory();
  const wines = useSelector((store) => store.wines);

  useEffect(() => {
    dispatch({ type: 'FETCH_OUT_OF_STOCK_WINES' });
    window.scrollTo(0, 0);
  }, []);

  const inStock = (wineID) => {
    dispatch({ type: 'UPDATE_WINE_IN_STOCK', payload: wineID });
    history.push('/winevarietals');
  };

  return (
    <div className='wine-page'>
      <div className='container'>
        <div className='wine-header'>
          <h6
            onClick={() => history.push('/winevarietals')}
            className='home-button'
          >
            Varietals
          </h6>
          <h4>Out of Stock Wines</h4>
          <h6 onClick={() => history.push('/home')}>Home</h6>
        </div>
        <ul className='wine-styles-list'>
          {wines.map((wine) => (
            <div key={wine.id}>
              <div className='indiv-wine'>
                <li>{wine.name_winery}</li>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => inStock(wine.id)}
                >
                  Mark In Stock
                </button>
              </div>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

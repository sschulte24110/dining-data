import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './OutOfStockBeer.css';

export default function OutOfStockBeer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const beers = useSelector((store) => store.beers);

  useEffect(() => {
    dispatch({ type: 'FETCH_OUT_OF_STOCK_BEERS' });
    window.scrollTo(0, 0);
  }, []);

  const inStock = (beerID) => {
    dispatch({ type: 'UPDATE_BEER_IN_STOCK', payload: beerID });
    history.push('/beerstyle');
  };

  return (
    <div className='beer-page'>
      <div className='container'>
        <div className='beer-header'>
          <h6
            onClick={() => history.push('/beerstyle')}
            className='home-button'
          >
            Styles
          </h6>
          <h4>Out of Stock Beers</h4>
          <h6 onClick={() => history.push('/home')}>Home</h6>
        </div>
        <ul className='beer-styles-list'>
          {beers.map((beer) => (
            <div key={beer.id}>
              <div className='indiv-beer'>
                <li>{beer.name}</li>
                <button
                  className='btn btn-outline-secondary'
                  onClick={() => inStock(beer.id)}
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

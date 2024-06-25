import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './WinesByVarietal.css';
import WineSearch from '../WineSearch/WineSearch';

export default function WinesByVarietal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const wines = useSelector((store) => store.wines);

  useEffect(() => {
    dispatch({ type: 'FETCH_VARIETAL_WINE', payload: params.id });
  }, []);

  return (
    <div className='container'>
      <div className='wine-header'>
        <h6
          onClick={() => history.push('/winevarietals')}
          className='home-button'
        >
          Back
        </h6>
        <h4>{wines[0].wine_varietal_name}</h4>
        <h6 onClick={() => history.push('/wineform')}>Add</h6>
      </div>
      <WineSearch />
      <ul className='specific-wine-list'>
        {wines.map((wine, i) => (
          <div key={wine.id}>
            <div className='indiv-wine'>
              <li
                onClick={() => {
                  history.push(`winedetails/${wine.id}`);
                }}
              >
                <div className='wineName'>{wine.name_winery}</div>
              </li>
              <button
                className='btn btn-outline-secondary'
                onClick={() => {
                  history.push(`/winesbyvarietal/editwine/${wine.id}`);
                }}
              >
                Edit
              </button>
            </div>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}

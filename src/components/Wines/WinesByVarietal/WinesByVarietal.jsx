import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './WinesByVarietal.css';

export default function WinesByVarietal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const wines = useSelector((store) => store.wines);

  useEffect(() => {
    dispatch({ type: 'FETCH_VARIETAL_WINE', payload: params.id });
  }, []);
  console.log(`params`, params);

  return (
    <div className='container'>
      <div className='wine-header'>
        <h5
          onClick={() => history.push('/winevarietals')}
          className='home-button'
        >
          Varietals
        </h5>
        <h3>{wines[0].wine_varietal_name}</h3>
        <h5 onClick={() => history.push('/wineform')}>Add</h5>
      </div>
      <ul className="specific-wine-list">
        {wines.map((wine, i) => (
          <div key={wine.id} onClick={() => {history.push(`editwine/${wine.id}`)}}>
            <li>
              <div className="wineName">{wine.name_winery}</div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}

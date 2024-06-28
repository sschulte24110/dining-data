import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './WineDetails.css';

export default function WineDetails() {
  const { id } = useParams();
  const [wine, setWine] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const wines = useSelector((store) => store.wines);

  useEffect(() => {
    const foundWine = wines.find((w) => Number(w.id) === parseInt(id));
    setWine(foundWine);
    dispatch({ type: 'FETCH_VARIETALS' });
    dispatch({ type: 'FETCH_VENDORS' });
    window.scrollTo(0, 0);
  }, [id, wines]);

  if (!wine) {
    return <div>Loading...</div>;
  }

  const winePhotoUrl = wine.photo_url
    ? wine.photo_url
    : '/images/wine-bottle-dining-data.png';

    const outOfStock = (wineID) => {
      dispatch({ type: 'UPDATE_WINE_OUT_OF_STOCK', payload: wineID });
      history.push(`/winevarietals`);
    };

  return (
    <div className='wine-page'>
      <div className='container'>
        <div className='details-header'>
          <h6
            onClick={() => {
              history.push(`/winesbyvarietal/${wine.wine_varietal_id}`);
            }}
            className='home-button'
          >
            Back
          </h6>
          <h1 className='indiv-item-name'>{wine?.name_winery}</h1>
          <h6
            onClick={() => {
              history.push(`/winesbyvarietal/editwine/${wine.id}`);
            }}
          >
            Edit
          </h6>
        </div>
        <div className='card'>
          <img
            src={winePhotoUrl}
            alt='a picture of a bottle of wine'
            className='card-image-top'
          />
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'><strong>Name/Winery:</strong> {wine?.name_winery}</li>
            <li className='list-group-item'><strong>Region:</strong> {wine?.region}</li>
            <li className='list-group-item'>
            <strong>Varietal:</strong> {wine?.wine_varietal_name}
            </li>
            <li className='list-group-item'><strong>Year:</strong> {wine?.year}</li>
            <li className='list-group-item'>
            <strong>Description:</strong> {wine?.description}
            </li>
          </ul>
          <button
            id='details-button'
            className='btn btn-outline-danger'
            onClick={() => outOfStock(wine?.id)}
          >
            Mark Out of Stock
          </button>
          <button
            id='details-button'
            className='btn btn-outline-secondary'
            onClick={() => {
              history.push(`/winesbyvarietal/editwine/${wine.id}`);
            }}
          >
            Edit
          </button>
          <button
            id='details-button'
            className='btn btn-outline-secondary'
            onClick={() => {
              history.push(`/winesbyvarietal/${wine.wine_varietal_id}`);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

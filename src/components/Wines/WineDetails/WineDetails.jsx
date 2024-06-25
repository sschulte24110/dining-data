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
  }, [id, wines]);

  if (!wine) {
    return <div>Loading...</div>;
  }

  const winePhotoUrl = wine.photo_url
    ? wine.photo_url
    : '/images/wine-bottle-dining-data.png';

  return (
    <div>
      <div className='card'>
        <h1 className='indiv-wine-name'>{wine?.name_winery}</h1>
        <img
          src={winePhotoUrl}
          alt='a picture of a bottle of wine'
          className='card-image-top'
        />
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>Region: {wine?.region}</li>
          <li className='list-group-item'>Varietal: {wine?.wine_varietal_name}</li>
          <li className='list-group-item'>Year: {wine?.year}</li>
          <li className='list-group-item'>Description: {wine?.description}</li>
          <li className='list-group-item'></li>
        </ul>
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
  );
}

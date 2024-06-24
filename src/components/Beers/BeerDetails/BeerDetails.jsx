import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './BeerDetails.css';

export default function BeerDetails() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const vendors = useSelector((store) => store.vendors);

  useEffect(() => {
    const foundBeer = beers.find((b) => Number(b.id) === parseInt(id));
    setBeer(foundBeer);
    dispatch({ type: 'FETCH_STYLES' });
    dispatch({ type: 'FETCH_VENDORS' });
  }, [id, beers]);

  if (!beer) {
    return <div>Loading...</div>;
  }
  const beerPhotoUrl = beer.photo_url
    ? beer.photo_url
    : '/images/stock-beer-bottle-dining-data.png';

  return (
    <div>
      <div className='card'>
        <h1 className='indiv-beer-name'>{beer?.name}</h1>
        <img
          src={beerPhotoUrl}
          alt='a picture of the beer bottle or can'
          className='card-image-top'
        />

        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>Brewery: {beer?.brewery}</li>
          <li className='list-group-item'>Style: {beer?.beer_style_name}</li>
          <li className='list-group-item'>ABV: {beer?.abv}</li>
          <li className='list-group-item'>Description: {beer?.description}</li>
        </ul>

        <button
          className='btn btn-outline-secondary'
          onClick={() => {
            history.push(`/editbeer/${beer.id}`);
          }}
        >
          Edit
        </button>
        <button
          className='btn btn-outline-secondary'
          onClick={() => {
            history.push(`/beersbystyle/${beer.beer_style}`);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

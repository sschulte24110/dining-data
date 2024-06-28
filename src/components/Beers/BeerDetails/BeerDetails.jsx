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
    window.scrollTo(0, 0);
  }, [id, beers]);

  if (!beer) {
    return <div>Loading...</div>;
  }
  const beerPhotoUrl = beer.photo_url
    ? beer.photo_url
    : '/images/stock-beer-bottle-dining-data.png';

  const outOfStock = (beerID) => {
    dispatch({ type: 'UPDATE_BEER_OUT_OF_STOCK', payload: beerID });
    history.push(`/beerstyle`);
  };

  return (
    <div className='beer-page'>
      <div className='container'>
        <div className='details-header'>
          <h6
            onClick={() => {
              history.push(`/beersbystyle/${beer.beer_style}`);
            }}
            className='home-button'
          >
            Back
          </h6>
          <h2 className='indiv-item-name'>{beer?.name}</h2>
          <h6
            onClick={() => {
              history.push(`/editbeer/${beer.id}`);
            }}
          >
            Edit
          </h6>
        </div>
        <div className='card'>
          <img
            src={beerPhotoUrl}
            alt='a picture of the beer bottle or can'
            className='card-image-top'
          />

          <ul className='list-group list-group-flush'>
            <li className='list-group-item'><strong>Name:</strong> {beer?.name}</li>
            <li className='list-group-item'><strong>Brewery:</strong> {beer?.brewery}</li>
            <li className='list-group-item'><strong>Style:</strong> {beer?.beer_style_name}</li>
            <li className='list-group-item'><strong>ABV:</strong> {beer?.abv}</li>
            <li className='list-group-item'>
            <strong>Description:</strong> {beer?.description}
            </li>
          </ul>
          <button
            id='details-button'
            className='btn btn-outline-danger'
            onClick={() => outOfStock(beer?.id)}
          >
            Mark Out of Stock
          </button>
          <button
            id='details-button'
            className='btn btn-outline-secondary'
            onClick={() => {
              history.push(`/editbeer/${beer.id}`);
            }}
          >
            Edit
          </button>
          <button
            id='details-button'
            className='btn btn-outline-secondary'
            onClick={() => {
              history.push(`/beersbystyle/${beer.beer_style}`);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

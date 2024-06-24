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

  return (
    <div>
      <div className='container'>
        <h1 className='indiv-beer-name'>{beer?.name}</h1>
        <img src={beer.photo_url} alt='../images/brown-beer-bottle.png' />
        <ul>
          <li>{beer?.brewery}</li>
          <li>{beer?.beer_style_name}</li>
          <li>{beer?.abv}</li>
          <li>{beer?.description}</li>
        </ul>
        <button 
          className='btn btn-outline-secondary'
          onClick={() => {
            history.push(`/editbeer/${beer.id}`);
          }}
        >
          Edit
        </button>
        <button className='btn btn-outline-secondary' onClick={() => {history.push(`/beers/${beer.beer_style}`)}}>Back</button>
      </div>
    </div>
  );
}

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
      <img src={beer.photo_url} alt="312 Urban Wheat Ale can" />
      <ul>
        <li>{beer?.brewery}</li>
        <li>{beer?.beer_style_name}</li>
        <li>{beer?.abv}</li>
        <li>{beer?.description}</li>
      </ul>
      </div>
    </div>
  )
}

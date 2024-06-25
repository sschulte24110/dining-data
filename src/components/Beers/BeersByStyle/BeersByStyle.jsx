import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './BeersByStyle.css';
import BeerSearch from '../BeerSearch/BeerSearch';

export default function Beers() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const beers = useSelector((store) => store.beers);

  useEffect(() => {
    dispatch({ type: 'FETCH_STYLE_BEER', payload: params.id });
  }, []);

  return (
    <div className='container'>
      <div className='beer-header'>
        <h6 onClick={() => history.push('/beerstyle')} className='home-button'>
          Back
        </h6>
        <h4>{beers[0].beer_style_name}</h4>
        <h6 onClick={() => history.push('/beerform')}>Add</h6>
      </div>
      <BeerSearch />
      <ul className='specific-beer-list'>
        {beers.map((beer, i) => (
          <div
            key={beer.id}
            onClick={() => {
              history.push(`/beerdetails/${beer.id}`);
            }}
          >
            <li>
              <div className='beerName'>{beer.name}</div>
              <div className='beerBrewery'>{beer.brewery}</div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}
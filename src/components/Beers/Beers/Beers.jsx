import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './Beers.css';

export default function Beers() {
  const params = useParams();
  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_STYLE_BEER', payload: params.id });
    dispatch({ type: 'FETCH_STYLES', payload: params.id});
  }, []);
  console.log(params);

  return (
    <div>
      <p>{styles.beer_style}</p>
      <ul className='specific-beer-list'>
        {beers.map((beer) => (
          <div>
            <li key={beer.id}>
              <div className='beerName'>
              {beer.name}
              </div>
              <div className='beerBrewery'>
              {beer.brewery}
              </div>
            </li>
            <hr />
          </div>
        ))}
      </ul>
    </div>
  );
}

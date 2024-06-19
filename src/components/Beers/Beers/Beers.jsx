import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './Beers.css';

export default function Beers() {
  const params = useParams();
  const beers = useSelector((store) => store.beers);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_STYLE_BEER', payload: params.id });
  }, []);
  console.log(params);
  console.log(beers);

  // const handleClick = () => {
  //   history.push(`/editbeer/${beer.id}`);
  // }

  return (
    <div className='container'>
      <div className='beer-header'>
        <h5 onClick={() => history.push('/beerstyle')} className='home-button'>Styles</h5>
        <h3>{beers[0].beer_style_name}</h3>
        <h5 onClick={() => history.push('/beerform')}>Add</h5>
      </div>
      <ul className='specific-beer-list'>
        {beers.map((beer) => (
          <div onClick={() => {history.push(`/editbeer/${beer.id}`)}}>
            <li key={beer.id}>
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

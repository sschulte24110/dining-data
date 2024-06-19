import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './BeerStyle.css';
import BeerStyleList from '../BeerStyleList/BeerStyleList';

export default function BeerStyle() {
  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_BEERS' });
    dispatch({ type: 'FETCH_STYLES'});
  }, []);

  const handleClick = () => {
    history.push(`/beer/${beer_style.id}`);
  };

  return (
    <>
      <div>
        <div className='beer-header'>
          <h5 className='home-button'>Home</h5>
          <h3>Beer Styles</h3>
        </div>
        <ul className='beer-styles-list'>
          {styles.map((style) => (
            <BeerStyleList key={style.id} style={style} />
          ))}
        </ul>
      </div>
    </>
  );
}

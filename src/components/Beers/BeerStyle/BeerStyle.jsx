import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './BeerStyle.css';
import BeerStyleList from '../BeerStyleList/BeerStyleList';

export default function BeerStyle() {
  const styles = useSelector((store) => store.styles);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_BEERS' });
    dispatch({ type: 'FETCH_STYLES'});
  }, []);


  return (
    <>
      <div className='container'>
        <div className='beer-header'>
          <h5 onClick={() => history.push('/home')} className='home-button'>Home</h5>
          <h3>Beer Styles</h3>
          <h5 onClick={() => history.push('/beerform')}>Add</h5>
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

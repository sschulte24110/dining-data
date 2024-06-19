import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './WineVarietals.css';
import WineVarietalsList from '../WineVarietalsList/WineVarietalsList';

export default function WineVarietals() {
  const varietals = useSelector((store) => store.varietals);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_WINES' });
    dispatch({ type: 'FETCH_VARIETALS'});
  }, [])


  return (
    <div className='container'>
      <div className='wine-header'>
        <h5 onClick={() => history.push('/home')} className='home-button'>Home</h5>
        <h3>Wine Varietals</h3>
        <h5 onClick={() => history.push('/wineform')}>Add</h5>
      </div>
      <ul className='wine-varietals-list'>
        {varietals.map((varietal) => (
          <WineVarietalsList key={varietal.id} varietal={varietal}/>
        ))}
      </ul>
    </div>
  );
}

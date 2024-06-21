import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './BeerStyle.css';
import BeerStyleList from '../BeerStyleList/BeerStyleList';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import BeerSearch from '../BeerSearch/BeerSearch';

export default function BeerStyle() {
  const styles = useSelector((store) => store.styles);
  const beers = useSelector((store) => store.beers);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_BEERS' });
    dispatch({ type: 'FETCH_STYLES' });
  }, []);

  return (
    <>
      <div className='container'>
        <div className='beer-header'>
          <h6 onClick={() => history.push('/home')} className='home-button'>
            Home
          </h6>
          <h3>Beer Styles</h3>
          <h6 onClick={() => history.push('/beerform')}>Add</h6>
        </div>
        <div className='search-form'>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id='free-solo-2-demo'
              disableClearable
              options={beers.map((option) => option.brewery)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Search beer by brewery'
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </Stack>
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

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Beers() {
  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const dispatch = useDispatch();

  let [newBeer, setNewBeer] = useState({
    name: '',
    brewery: '',
    beer_style: '',
    abv: '',
    photo_url: '',
    description: '',
    vendor_id: '',
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_BEERS' });
    dispatch({ type: 'FETCH_STYLES' })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_BEER', payload: newBeer });
  };

  return (
    <>
      <h2>Beers</h2>

      <div>
        <h3>Add New Beer</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='beerName'>Name</label>
            <br />
            <input
              type='text'
              placeholder='Name'
              value={newBeer.name}
              onChange={(event) =>
                setNewBeer({ ...newBeer, name: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='beerBrewery'>Brewery</label>
            <br />
            <input
              type='text'
              placeholder='Brewery'
              value={newBeer.brewery}
              onChange={(event) =>
                setNewBeer({ ...newBeer, brewery: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='beer'>Style</label>
            <br />
            <select
              name='styleSelect'
              id='style-dropdown'
              onChange={(event) => {
                setNewBeer({ ...newBeer, beer_style: event.target.value })
              }}
            >
              <option>Select Style</option>
              {styles.map((style, i) => {
                return (
                  <option key={i} value={style.id}>{style.beer_style}</option>
                )
              })}
            </select>
          </div>
        </form>
      </div>
      <div>
        <h3>Beer List</h3>
        <ul>
          {beers.map((beer, i) => (
            <li key={i}>
              {beer.name} {beer.brewery}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

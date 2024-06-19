import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function BeerForm() {
  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(vendors);

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
    dispatch({ type: 'FETCH_STYLES' });
    dispatch({ type: 'FETCH_VENDORS'});
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_BEER', payload: newBeer });
    history.push('/beerstyle');
  };
  
  
  return (
    <div className='container'>
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
                setNewBeer({ ...newBeer, beer_style: event.target.value });
              }}
            >
              <option>Select Style</option>
              {styles.map((style, i) => {
                return (
                  <option key={i} value={style.id}>
                    {style.beer_style}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor='beerABV'>ABV</label>
            <br />
            <input
              type='text'
              placeholder='ABV'
              value={newBeer.abv}
              onChange={(event) =>
                setNewBeer({ ...newBeer, abv: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='beerDescription'>Description</label>
            <br />
            <textarea
              type='text'
              placeholder='Description'
              value={newBeer.description}
              onChange={(event) =>
                setNewBeer({ ...newBeer, description: event.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor='beerVendor'>Vendor</label>
            <br />
            <select
              name='vendorSelect'
              id='vendor-dropdown'
              onChange={(event) => {
                setNewBeer({ ...newBeer, vendor_id: event.target.value });
              }}
            >
              <option>Select Vendor</option>
              {vendors.map((vendor, i) => {
                return (
                  <option key={i} value={vendor.id}>
                    {vendor.vendor_name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className='btn btn-secondary' type='submit' value='Add New Beer'>Save</button>
        <button className='btn btn-secondary' type='button' onClick={() => history.push('/beerstyle')} >Cancel</button>
        </form>
      </div>
  )
}
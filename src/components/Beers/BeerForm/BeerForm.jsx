import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './BeerForm.css';

export default function BeerForm() {
  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch({ type: 'FETCH_VENDORS' });
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_BEER', payload: newBeer });
    history.push('/beerstyle');
  };

  return (
    <div className='beer-page'>
      <div className='container'>
        <h1 className='indiv-beer-name'>Add New Beer</h1>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label htmlFor='beerName'>Name</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Name'
                  value={newBeer.name}
                  onChange={(event) =>
                    setNewBeer({ ...newBeer, name: event.target.value })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label htmlFor='beerBrewery'>Brewery</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Brewery'
                  value={newBeer.brewery}
                  onChange={(event) =>
                    setNewBeer({ ...newBeer, brewery: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-2'>
              <div className='mb-3'>
                <label htmlFor='beerABV'>ABV</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='ABV'
                  value={newBeer.abv}
                  onChange={(event) =>
                    setNewBeer({ ...newBeer, abv: event.target.value })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-5'>
              <div className='mb-3'>
                <label htmlFor='beer'>Style</label>
                <br />
                <select
                  name='styleSelect'
                  className='form-select'
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
            </div>
            <div className='col-12 col-lg-5'>
              <div className='mb-3'>
                <label htmlFor='beerVendor'>Vendor</label>
                <br />
                <select
                  name='vendorSelect'
                  className='form-select'
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
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <div className='mb-3'>
                <label htmlFor='beerDescription'>Description</label>
                <br />
                <textarea
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Description'
                  value={newBeer.description}
                  onChange={(event) =>
                    setNewBeer({ ...newBeer, description: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <div className='mb-3'>
                <label htmlFor='beerURL'>Photo URL</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Photo URL'
                  value={newBeer.photo_url}
                  onChange={(event) =>
                    setNewBeer({ ...newBeer, photo_url: event.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <button
            className='btn btn-secondary'
            type='submit'
            value='Add New Beer'
          >
            Save
          </button>
          <button
            className='btn btn-secondary'
            type='button'
            onClick={() => history.push('/beerstyle')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

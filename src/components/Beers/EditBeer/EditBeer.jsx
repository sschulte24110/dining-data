import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditBeer.css';

export default function EditBeer() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const vendors = useSelector((store) => store.vendors);

  useEffect(() => {
    const foundBeer = beers.find((b) => Number(b.id) === parseInt(id));
    setBeer(foundBeer);
    dispatch({ type: 'FETCH_STYLES' });
    dispatch({ type: 'FETCH_VENDORS'});
  }, [id, beers]);

  if (!beer) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_BEER', payload: beer });
    history.push('/beerstyle');
  };

  return (
    <div className='container'>
      <h3>{beer?.name}</h3>
      <form onSubmit={handleSubmit}>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='beerName'>Name</label>
            <br />
            <input
              type='text'
              className='form-control custom-margin'
              placeholder={beer?.name}
              value={beer?.name}
              onChange={(event) =>
                setBeer({ ...beer, name: event.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor='beerBrewery'>Brewery</label>
          <br />
          <input
            type='text'
            placeholder={beer?.brewery}
            value={beer?.brewery}
            onChange={(event) =>
              setBeer({ ...beer, brewery: event.target.value })
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
              setBeer({ ...beer, beer_style: event.target.value });
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
            placeholder={beer?.abv}
            value={beer?.abv}
            onChange={(event) =>
              setBeer({ ...beer, abv: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='beerDescription'>Description</label>
          <br />
          <textarea
            type='text'
            placeholder={beer?.description}
            value={beer?.description}
            onChange={(event) =>
              setBeer({ ...beer, description: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='beerVendor'>Vendor</label>
          <br />
          <select
            name='vendorSelect'
            id='style-dropdown'
            onChange={(event) => {
              setBeer({ ...beer, vendor_id: event.target.value });
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
  );
}

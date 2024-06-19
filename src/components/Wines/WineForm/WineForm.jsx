import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function WineForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const varietals = useSelector((store) => store.varietals);
  const vendors = useSelector((store) => store.vendors);

  let [newWine, setNewWine] = useState({
    name_winery: '',
    wine_varietal_id: '',
    region: '',
    year: '',
    photo_url: '',
    description: '',
    vendor_id: '',
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_VARIETALS' });
    dispatch({ type: 'FETCH_VENDORS' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_WINE', payload: newWine });
    history.push('/winevarietals');
  };

  return (
    <div className='container'>
      <h3>Add New Wine</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='wineName-Winery'>Name and Winery</label>
          <br />
          <input
            type='text'
            placeholder='Name and Winery'
            value={newWine.name_winery}
            onChange={(event) =>
              setNewWine({ ...newWine, name_winery: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='beer'>Varietal</label>
          <br />
          <select
            name='varietalSelect'
            id='varietal-dropdown'
            onChange={(event) => {
              setNewWine({ ...newWine, wine_varietal_id: event.target.value });
            }}
          >
            <option>Select Varietal</option>
            {varietals.map((varietal, i) => {
              return (
                <option key={i} value={varietal.id}>
                  {varietal.wine_varietal}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor='wineRegion'>Region</label>
          <br />
          <input
            type='text'
            placeholder='Region'
            value={newWine.region}
            onChange={(event) =>
              setNewWine({ ...newWine, region: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='wineRegion'>Year</label>
          <br />
          <input
            type='text'
            placeholder='Year'
            value={newWine.year}
            onChange={(event) =>
              setNewWine({ ...newWine, year: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='wineDescription'>Description</label>
          <br />
          <textarea
            type='text'
            placeholder='Description'
            value={newWine.description}
            onChange={(event) =>
              setNewWine({ ...newWine, description: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='wineVendor'>Vendor</label>
          <br />
          <select
            name='vendorSelect'
            id='vendor-dropdown'
            onChange={(event) => {
              setNewWine({ ...newWine, vendor_id: event.target.value });
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
          value='Add New Wine'
        >
          Save
        </button>
        <button
          className='btn btn-secondary'
          type='button'
          onClick={() => history.push('/winevarietals')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

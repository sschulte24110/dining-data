import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './WineForm.css';

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
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_WINE', payload: newWine });
    history.push('/winevarietals');
  };

  return (
    <div className='wine-page'>
      <div className='container'>
        <h1 className='indiv-wine-name'>Add New Wine</h1>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <div className='mb-3'>
                <label htmlFor='wineName-Winery'>Name and Winery</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Name and Winery'
                  value={newWine.name_winery}
                  onChange={(event) =>
                    setNewWine({ ...newWine, name_winery: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label htmlFor='wineRegion'>Region</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Region'
                  value={newWine.region}
                  onChange={(event) =>
                    setNewWine({ ...newWine, region: event.target.value })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label htmlFor='varietal'>Varietal</label>
                <br />
                <select
                  name='varietalSelect'
                  className='form-select'
                  id='varietal-dropdown'
                  onChange={(event) => {
                    setNewWine({
                      ...newWine,
                      wine_varietal_id: event.target.value,
                    });
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
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label htmlFor='wineRegion'>Year</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Year'
                  value={newWine.year}
                  onChange={(event) =>
                    setNewWine({ ...newWine, year: event.target.value })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label htmlFor='wineVendor'>Vendor</label>
                <br />
                <select
                  name='vendorSelect'
                  className='form-select'
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
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <div className='mb-3'>
                <label htmlFor='wineDescription'>Description</label>
                <br />
                <textarea
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Description'
                  value={newWine.description}
                  onChange={(event) =>
                    setNewWine({ ...newWine, description: event.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-12'>
              <div className='mb-3'>
                <label htmlFor='wineURL'>Photo URL</label>
                <br />
                <input
                  type='text'
                  className='form-control custom-margin'
                  placeholder='Photo URL'
                  value={newWine.photo_url}
                  onChange={(event) =>
                    setNewWine({ ...newWine, photo_url: event.target.value })
                  }
                />
              </div>
            </div>
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
    </div>
  );
}

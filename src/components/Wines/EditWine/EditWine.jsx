import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditWine.css';

export default function EditWine() {
  const { id } = useParams();
  const [wine, setWine] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const wines = useSelector((store) => store.wines);
  const varietals = useSelector((store) => store.varietals);
  const vendors = useSelector((store) => store.vendors);

  useEffect(() => {
    const foundWine = wines.find((w) => Number(w.id) === parseInt(id));
    setWine(foundWine);
    dispatch({ type: 'FETCH_VARIETALS' });
    dispatch({ type: 'FETCH_VENDORS' });
  }, [id, wines]);

  if (!wine) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_WINE', payload: wine });
    history.push('/winevarietals');
  };

  const deleteWine = (wineID) => {
    if (window.confirm('Are you sure you want to delete this wine?')) {
      dispatch({ type: 'DELETE_WINE', payload: wineID });
      history.push('/winevarietals');
    }
  };

  return (
    <div className='container'>
      <h1 className='indiv-wine-name'>{wine?.name_winery}</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-12 col-lg-12'>
            <div className='mb-3'>
              <label className='form-label' htmlFor='wineNameWinery'>
                Name and Winery
              </label>
              <br />
              <input
                type='text'
                className='form-control custom-margin'
                placeholder={wine?.name_winery}
                value={wine?.name_winery}
                onChange={(event) =>
                  setWine({ ...wine, name: event.target.value })
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
                placeholder={wine?.region}
                value={wine?.region}
                onChange={(event) =>
                  setWine({ ...wine, region: event.target.value })
                }
              />
            </div>
          </div>
          <div className='col-12 col-lg-6'>
            <div className='mb-3'>
              <label htmlFor='beer'>Varietal</label>
              <br />
              <select
                name='varietalSelect'
                className='form-select'
                id='varietal-dropdown'
                onChange={(event) => {
                  setWine({ ...wine, wine_varietal_id: event.target.value });
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
              <label htmlFor='wineYear'>Year</label>
              <br />
              <input
                type='text'
                className='form-control custom-margin'
                placeholder={wine?.year}
                value={wine?.year}
                onChange={(event) =>
                  setWine({ ...wine, year: event.target.value })
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
                id='style-dropdown'
                onChange={(event) => {
                  setWine({ ...wine, vendor_id: event.target.value });
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
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label htmlFor='wineDescription'>Description</label>
            <br />
            <textarea
              type='text'
              className='form-control custom-margin'
              placeholder={wine?.description}
              value={wine?.description}
              onChange={(event) =>
                setWine({ ...wine, description: event.target.value })
              }
            />
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
                value={wine.photo_url}
                onChange={(event) =>
                  setNewWine({ ...wine, photo_url: event.target.value })
                }
              />
            </div>
          </div>
        </div>
        <button className='btn btn-secondary' type='submit' value='Update Wine'>
          Save
        </button>
        <button
          className='btn btn-secondary'
          type='button'
          onClick={() => history.push(`/winesbyvarietal/winedetails/${wine?.id}`)}
        >
          Cancel
        </button>
        <button
          className='btn btn-secondary'
          type='button'
          onClick={() => deleteWine(wine.id)}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

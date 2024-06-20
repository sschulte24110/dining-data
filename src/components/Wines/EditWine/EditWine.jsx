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
    dispatch({ type: 'DELETE_WINE', payload: wineID });
    history.push('/winevarietals');
  };

  return (
    <div className='container'>
      <h3>{wine?.name_winery}</h3>
      <form onSubmit={handleSubmit}>
        <div className='col-lg-12'>
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
        <div>
          <label htmlFor='beer'>Varietal</label>
          <br />
          <select
            name='varietalSelect'
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
        <div>
          <label htmlFor='wineRegion'>Region</label>
          <br />
          <input
            type='text'
            placeholder={wine?.region}
            value={wine?.region}
            onChange={(event) =>
              setWine({ ...wine, region: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='wineYear'>Year</label>
          <br />
          <input
            type='text'
            placeholder={wine?.year}
            value={wine?.year}
            onChange={(event) => setWine({ ...wine, year: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor='wineDescription'>Description</label>
          <br />
          <textarea
            type='text'
            placeholder={wine?.description}
            value={wine?.description}
            onChange={(event) =>
              setWine({ ...wine, description: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor='wineVendor'>Vendor</label>
          <br />
          <select
            name='vendorSelect'
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
        <button className='btn btn-secondary' type='submit' value='Update Wine'>
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
      <button className='btn btn-secondary' onClick={() => deleteWine(wine.id)}>
        DELETE
      </button>
    </div>
  );
}
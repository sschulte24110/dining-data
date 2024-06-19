import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditVendor.css';

export default function EditVendor() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const history = useHistory();

  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();
  // const [editedVendor, setEditedVendor] = useState({
  //   vendor_name: vendors.vendor_name,
  // })

  useEffect(() => {
    const foundVendor = vendors.find((v) => Number(v.id) === parseInt(id));
    setVendor(foundVendor);
  }, [id, vendors])
  
  // if(!vendor) {
  //   return <div>Loading...</div>;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_VENDOR', payload: vendor });
    history.push('/vendors');
  };

  const deleteVendor = (vendorID) => {
    dispatch({ type: 'DELETE_VENDOR', payload: vendorID})
    history.push('/vendors');
  };
  
  return (
    <div className='container'>
      <h2>{vendor?.vendor_name}</h2>
      <form onSubmit={handleSubmit}>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='vendorName'>
              Vendor Name
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              placeholder={vendor?.vendor_name}
              value={vendor?.vendor_name}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  vendor_name: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='contactPersonName'>
              Contact Person Name
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              value={vendor?.contact_person_name}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  contact_person_name: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='phoneNumber'>
              Phone Number
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              value={vendor?.phone_number}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  phone_number: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='address'>
              Address
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              value={vendor?.address}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  address: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='city'>
              City
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              value={vendor?.city}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  city: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='state'>
             State
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              value={vendor?.state}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  state: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='zipCode'>
              Zip Code
            </label>
            <input
              type='text'
              className='form-control custom-margin'
              value={vendor?.zip_code}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  zip_code: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              className='form-control custom-margin'
              value={vendor?.email}
              onChange={(event) =>
                setVendor({
                  ...vendor,
                  email: event.target.value,
                })
              }
            />
          </div>
        </div>
        <button className='btn btn-secondary' type='submit' value='Update Vendor'>Save</button>
        <button className='btn btn-secondary' type='button' onClick={() => history.push('/vendors')} >Cancel</button>
      </form>
      <br />
      <button className='btn btn-secondary' onClick={() => deleteVendor(vendor.id)}>DELETE</button>
    </div>
  )
}
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './VendorForm.css';

export default function VendorForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  let [newVendor, setNewVendor] = useState({
    vendor_name: '',
    contact_person_name: '',
    phone_number: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_VENDOR', payload: newVendor });
    history.push('/vendors');
  };

  return (
    <div className='vendor-page'>
      <div className='container'>
        <div className='header'>
          <h1 className='indiv-vendor-name'>Add New Vendor</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='vendorName'>
                  Vendor Name
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.vendor_name}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      vendor_name: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='contactPersonName'>
                  Contact Person Name
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.contact_person_name}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      contact_person_name: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='phoneNumber'>
                  Phone Number
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.phone_number}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      phone_number: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='email'>
                  Email
                </label>
                <input
                  type='email'
                  className='form-control custom-margin'
                  value={newVendor.email}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      email: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='address'>
                  Address
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.address}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      address: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-lg-6'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='city'>
                  City
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.city}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      city: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-3'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='state'>
                  State
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.state}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      state: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className='col-12 col-lg-3'>
              <div className='mb-3'>
                <label className='form-label' htmlFor='zipCode'>
                  Zip Code
                </label>
                <input
                  type='text'
                  className='form-control custom-margin'
                  value={newVendor.zip_code}
                  onChange={(event) =>
                    setNewVendor({
                      ...newVendor,
                      zip_code: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <button
            className='btn btn-secondary'
            type='submit'
            value='Add New Vendor'
          >
            Save
          </button>
          <button
            className='btn btn-secondary'
            type='button'
            onClick={() => history.push('/vendors')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './EditVendor.css';

export default function EditVendor() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const vendors = useSelector((store) => store.vendors);

  useEffect(() => {
    const foundVendor = vendors.find((v) => Number(v.id) === parseInt(id));
    setVendor(foundVendor);
  }, [id, vendors]);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_VENDOR', payload: vendor });
    history.push('/vendors');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteVendor = (vendorID) => {
    dispatch({ type: 'DELETE_VENDOR', payload: vendorID });
    history.push('/vendors');
  };

  return (
    <div className='vendor-page'>
      <div className='container'>
        <h1 className='indiv-vendor-name'>{vendor?.vendor_name}</h1>
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
            <div className='col-12 col-lg-6'>
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
            <div className='col-12 col-lg-6'>
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
            <div className='col-12 col-lg-3'>
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
            <div className='col-12 col-lg-3'>
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
          </div>

          <button
            className='btn btn-secondary'
            type='submit'
            value='Update Vendor'
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
          <Button variant='secondary' onClick={handleShow}>
            Delete
          </Button>
          <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Delete Vendor?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this vendor?
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button
                  onClick={() => deleteVendor(vendor.id)}
                  variant='primary'
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </form>
        <br />
      </div>
    </div>
  );
}

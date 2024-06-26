import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './EditBeer.css';

export default function EditBeer() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const beers = useSelector((store) => store.beers);
  const styles = useSelector((store) => store.styles);
  const vendors = useSelector((store) => store.vendors);

  useEffect(() => {
    const foundBeer = beers.find((b) => Number(b.id) === parseInt(id));
    setBeer(foundBeer);
    dispatch({ type: 'FETCH_STYLES' });
    dispatch({ type: 'FETCH_VENDORS' });
  }, [id, beers]);

  if (!beer) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'UPDATE_BEER', payload: beer });
    history.push('/beerstyle');
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteBeer = (beerID) => {
    dispatch({ type: 'DELETE_BEER', payload: beerID });
    history.push('/beerstyle');
  };

  return (
    <div className='container'>
      <h1 className='indiv-beer-name'>{beer?.name}</h1>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-12 col-lg-6'>
            <div className='mb-3'>
              <label className='form-label' htmlFor='beerName'>
                Name
              </label>
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
          <div className='col-12 col-lg-6'>
            <div className='mb-3'>
              <label htmlFor='beerBrewery'>Brewery</label>
              <br />
              <input
                type='text'
                className='form-control custom-margin'
                placeholder={beer?.brewery}
                value={beer?.brewery}
                onChange={(event) =>
                  setBeer({ ...beer, brewery: event.target.value })
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
                placeholder={beer?.abv}
                value={beer?.abv}
                onChange={(event) =>
                  setBeer({ ...beer, abv: event.target.value })
                }
              />
            </div>
          </div>

          <div className='col-12 col-lg-5'>
            <div className='mb-3'>
              <label htmlFor='beer'>Style</label>
              <br />
              <select
                className='form-select'
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
          </div>
          <div className='col-12 col-lg-5'>
            <div className='mb-3'>
              <label htmlFor='beerVendor'>Vendor</label>
              <br />
              <select
                className='form-select'
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
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='mb-3'>
              <label htmlFor='beerDescription'>Description</label>
              <br />
              <textarea
                type='text'
                className='form-control custom-margin'
                placeholder={beer?.description}
                value={beer?.description}
                onChange={(event) =>
                  setBeer({ ...beer, description: event.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-lg-12'>
            <div className='mb-3'>
              <label htmlFor='beerPhotoURL'>Photo URL</label>
              <br />
              <input
                type='text'
                className='form-control custom-margin'
                placeholder={beer?.photo_url}
                value={beer?.photo_url}
                onChange={(event) =>
                  setBeer({ ...beer, photo_url: event.target.value })
                }
              />
            </div>
          </div>
          <div className='row'>
            <div className='form-check form-switch'>
              <label
                htmlFor='flexSwitchOutOfStock'
                className='form-check-label'
              >
                Out of Stock
              </label>
              <input
                type='checkbox'
                role='switch'
                value={beer?.out_of_stock}
                className='form-check-input'
                id='flexSwitchCheckDefault'
              />
            </div>
          </div>
        </div>

        <button className='btn btn-secondary' type='submit' value='Update Beer'>
          Save
        </button>
        <button
          className='btn btn-secondary'
          type='button'
          onClick={() => history.push(`/beerdetails/${beer.id}`)}
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
              <Modal.Title>Delete Beer?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this beer?</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button onClick={() => deleteBeer(beer.id)} variant='primary'>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
    </div>
  );
}

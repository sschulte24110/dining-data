import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './VendorDetails.css';

export default function VendorDetails() {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const vendors = useSelector((store) => store.vendors);

  useEffect(() => {
    const foundVendor = vendors.find((v) => Number(v.id) === parseInt(id));
    setVendor(foundVendor);
    window.scrollTo(0, 0);
  }, [id, vendors]);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div className='vendor-page'>
      <div className='container'>
        <div className='card'>
          <h1 className='indiv-vendor-name'>{vendor?.vendor_name}</h1>
          <ul className='list-group list-group-flush'>
            <li className='list-group-item'>
            <strong>Contact Name:</strong> {vendor?.contact_person_name}
            </li>
            <li className='list-group-item'>
            <strong>Phone Number:</strong> {vendor?.phone_number}
            </li>
            <li className='list-group-item'><strong>Email:</strong> {vendor?.email}</li>
            <li className='list-group-item'><strong>Address:</strong> {vendor?.address}</li>
            <li className='list-group-item'>
            <strong>City, State:</strong> {vendor?.city}, {vendor?.state}
            </li>
            <li className='list-group-item'><strong>Zip Code:</strong> {vendor?.zip_code}</li>
          </ul>
          <button
            id='details-button'
            className='btn btn-outline-secondary'
            onClick={() => {
              history.push(`/editvendor/${vendor.id}`);
            }}
          >
            Edit
          </button>
          <button
            id='details-button'
            className='btn btn-outline-secondary'
            onClick={() => {
              history.push(`/vendors`);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

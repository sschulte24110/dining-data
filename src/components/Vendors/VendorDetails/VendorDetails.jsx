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
  }, [id, vendors]);

  if (!vendor) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='card'>
        <h1 className='indiv-vendor-name'>{vendor?.vendor_name}</h1>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Contact Name: {vendor?.contact_person_name}</li>
          <li className="list-group-item">Phone Number: {vendor?.phone_number}</li>
          <li className="list-group-item">Contact Email: {vendor?.email}</li>
          <li className="list-group-item">Address: {vendor?.address}</li>
          <li className="list-group-item">City, State: {vendor?.city}, {vendor?.state}</li>
          <li className="list-group-item">Zip Code: {vendor?.zip_code}</li>
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
  );
}

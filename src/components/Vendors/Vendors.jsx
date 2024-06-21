import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VendorList from './VendorList/VendorList';
import './Vendors.css';
import VendorSearch from './VendorSearch/VendorSearch';

export default function Vendors() {
  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_VENDORS' });
  }, []);

  return (
    <div className='container'>
      <div className='vendor-header'>
        <h6 onClick={() => history.push('/home')}>Home</h6>
        <h3>Manage Vendors</h3>
        <h6 onClick={() => history.push('/vendorform')}>Add</h6>
      </div>
      <VendorSearch />
      <ul className='vendors'>
        {vendors.map((vendor) => (
          <VendorList key={vendor.id} vendor={vendor} />
        ))}
      </ul>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VendorList from './VendorList/VendorList';
import './Vendors.css';

export default function Vendors() {
  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_VENDORS' });
  }, []);

  return (
    <div className='container'>
      <br />
      <div className='vendor-header'>
        <h5 onClick={() => history.push('/home')}>Home</h5>
        <h1>Manage Vendors</h1>
        <h5 onClick={() => history.push('/vendorform')}>Add</h5>
      </div>
      <br />
      <ul className='vendors'>
        {vendors.map((vendor) => (
          <VendorList key={vendor.id} vendor={vendor} />
        ))}
      </ul>
    </div>
  );
}

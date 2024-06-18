import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function VendorList() {
  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_VENDORS' });
  }, []);

  return (
    <>
      <h1>Manage Vendors</h1>
      <ul>
        {vendors.map((vendor, i) => {
          return <li key={i}>{vendor.vendor_name}</li>
        })}
      </ul>
    </>
  );
}

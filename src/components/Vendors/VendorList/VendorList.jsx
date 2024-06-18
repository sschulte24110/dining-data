import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function VendorList({vendor}) {
  // const vendors = useSelector((store) => store.vendors);
  // const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div onClick={() => history.push(`/editvendor/${vendor.id}`)}>
      <li key={vendor.id}>{vendor.vendor_name}</li>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function VendorList() {
  const vendors = useSelector((store) => store.vendors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_VENDORS'});
  }, [])

  return (
    <>
    <h1>Manage Vendors</h1>
    </>
  )
}
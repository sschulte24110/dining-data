import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function VendorList({vendor}) {
  const history = useHistory();
  

  const handleClick = () => {
    history.push(`/editvendor/${vendor.id}`)
  }

  return (
    <div onClick={() => {handleClick()}}>
      <li key={vendor.id}>{vendor.vendor_name}</li>
      <hr />
    </div>
  );
}

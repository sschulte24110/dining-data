import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import VendorList from './VendorList/VendorList';

export default function Vendors() {
  return (
    <>
    <VendorList />
    </>
  )
}
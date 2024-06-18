import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVendors() {
  try {
    const response = yield axios.get('api/vendors');
    yield put({ type: 'SET_VENDORS', payload: response.data});
  } catch (error) {
    console.error(`Error getting vendors`);
  }
}

function* addVendor(action) {
  try {
    yield axios.post('api/vendors', action.payload);
    yield put({ type: 'FETCH_VENDORS' })
  } catch (error) {
    alert('Error Adding Vendor');
    console.error(`Error adding vendor`,error)
  }
}

function* updateVendor(action) {
  try {
    yield axios.put(`/api/vendors/${action.payload.id}`, {vendor_name: action.payload.vendor_name, contact_person_name: action.payload.contact_person_name, phone_number: action.payload.phone_number, address: action.payload.address, city: action.payload.city, state: action.payload.state, zip_code: action.payload.zip_code, email: action.payload.email});
    yield put({ type: 'FETCH_VENDORS'});
  } catch (error) {
    alert(`Error editing vendor`);
    console.log(`Error editing vendor`, error);
  }
}

function* vendorsSaga() {
  yield takeLatest('FETCH_VENDORS', fetchVendors)
  yield takeLatest('ADD_VENDOR', addVendor)
  yield takeLatest('UPDATE_VENDOR', updateVendor)
}

export default vendorsSaga;
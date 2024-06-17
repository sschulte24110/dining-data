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
    console.error(error)
  }
}

function* vendorsSaga() {
  yield takeLatest('FETCH_VENDORS', fetchVendors)
  yield takeLatest('ADD_VENDOR', addVendor)
}

export default vendorsSaga;
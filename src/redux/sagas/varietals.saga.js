import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVarietals() {
  try {
    const response = yield axios.get('api/varietals');
    yield put({ type: 'SET_VARIETALS', payload: response.data});
  } catch (error) {
    console.error(`Error getting varietals`);
  }
}

function* varietalsSaga() {
  yield takeLatest('FETCH_VARIETALS', fetchVarietals);
}

export default varietalsSaga;
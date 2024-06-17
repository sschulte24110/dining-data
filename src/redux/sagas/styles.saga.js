import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStyles() {
  try {
    const response = yield axios.get('api/styles');
    yield put({ type: 'SET_STYLES', payload: response.data});
  } catch (error) {
    console.error(`Error getting styles`);
  }
}

function* stylesSaga() {
  yield takeLatest('FETCH_STYLES', fetchStyles);
}

export default stylesSaga;
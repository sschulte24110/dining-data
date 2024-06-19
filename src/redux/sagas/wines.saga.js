import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchWines() {
  try {
    const response = yield axios.get('/api/wines');
    yield put({ type: 'SET_WINES', payload: response.data});
  } catch (errro) {
    console.error(`Error getting wines`);
  }
}

function* winesSaga() {
  yield takeLatest('FETCH_WINES', fetchWines)
}

export default winesSaga;
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

function* addWine(action) {
  try {
    yield axios.post('api/wines', action.payload);
    yield put({ type: 'FETCH_WINES'})
  } catch (error) {
    alert(`Error adding wine`);
    console.error(error);
  }
}

function* fetchWineByVarietal(action) {
  try {
    const response = yield axios.get(`api/wines/${action.payload}`);
    yield put({ type: 'SET_VARIETAL_WINE', payload: response.data });
    console.log(response.data);
  } catch (error) {
    alert(`Error getting specific varietal of wine`);
    console.error(error);
  }
}

function* winesSaga() {
  yield takeLatest('FETCH_WINES', fetchWines)
  yield takeLatest('FETCH_VARIETAL_WINE', fetchWineByVarietal);
  yield takeLatest('ADD_WINE', addWine)
}

export default winesSaga;
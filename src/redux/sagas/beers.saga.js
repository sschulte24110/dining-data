import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects'

function* fetchBeers(action) {
  try {
    const response = yield axios.get('api/beers');
    yield put({ type: 'SET_BEERS', payload: response.data});
  } catch (error) {
    console.error(`Error getting beers`);
  }
}

function* beersSaga() {
  yield takeLatest('FETCH_BEERS', fetchBeers);
}

export default beersSaga;
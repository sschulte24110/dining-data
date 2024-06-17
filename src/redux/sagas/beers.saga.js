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

function* addBeer(action) {
  try {
    yield axios.post('api/beers', action.payload);
    yield put({ type: 'FETCH_BEERS' })
  } catch (error) {
    alert(`error adding beer`);
    console.error(error);
  }
}

function* beersSaga() {
  yield takeLatest('FETCH_BEERS', fetchBeers);
  yield takeLatest('ADD_BEER', addBeer);
}

export default beersSaga;
import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchBeers() {
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
    alert(`Error adding beer`);
    console.error(error);
  }
}

function* fetchStyleBeer(action) {
  try {
    const styleBeerResponse = yield axios.get(`api/beers/${action.payload}`);
    yield put({ type: 'SET_STYLE_BEER', payload: styleBeerResponse.data[0] });
    console.log(styleBeerResponse.data);
  } catch (error) {
    alert(`Error getting specific style of beer`);
    console.error(error);
  }
}

function* beersSaga() {
  yield takeLatest('FETCH_BEERS', fetchBeers);
  yield takeLatest('ADD_BEER', addBeer);
  yield takeLatest('FETCH_STYLE_BEER', fetchStyleBeer);
}

export default beersSaga;
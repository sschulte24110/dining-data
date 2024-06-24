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
    yield put({ type: 'SET_STYLE_BEER', payload: styleBeerResponse.data });
  } catch (error) {
    alert(`Error getting specific style of beer`);
    console.error(error);
  }
}

function* updateBeer(action) {
  try {
    yield axios.put(`/api/beers/${action.payload.id}`, {name: action.payload.name, brewery: action.payload.brewery, beer_style: action.payload.beer_style, abv: action.payload.abv, photo_url: action.payload.photo_url, description: action.payload.description, vendor_id: action.payload.vendor_id})
    yield put({ type: 'FETCH_BEERS'})
  } catch (error) {
    alert(`Error editing beer`);
    console.log(`Error editing beer`, error);
  }
}

function* deleteBeer(action) {
  try {
    yield axios.delete(`/api/beers/${action.payload}`);
    yield put({ type: 'FETCH_BEERS'});
  } catch (error) {
    alert(`Error deleting beer`);
    console.log(`Error deleting beer`, error);
  }
}

function* beersSaga() {
  yield takeLatest('FETCH_BEERS', fetchBeers);
  yield takeLatest('ADD_BEER', addBeer);
  yield takeLatest('FETCH_STYLE_BEER', fetchStyleBeer);
  yield takeLatest('UPDATE_BEER', updateBeer);
  yield takeLatest('DELETE_BEER', deleteBeer)
}

export default beersSaga;
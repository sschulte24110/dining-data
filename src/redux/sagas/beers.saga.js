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

function* fetchOutOfStockBeers() {
  try {
    const response = yield axios.get('api/beers/beersoutofstock');
    yield put({ type: 'SET_OUT_OF_STOCK_BEERS', payload: response.data})
  } catch (error) {
    console.error(`Error getting out of stock`)
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

function* updateBeerOutStock(action) {
  try {
    yield axios.put(`/api/beers/beerdetails/${action.payload}`);
    yield put({ type: 'FETCH_BEERS'});
  } catch (error) {
    alert(`Error marking beer out of stock`);
    console.log(`Error marking beer out of stock`, error);
  }
}

function* updateBeerInStock(action) {
  try {
    yield axios.put(`/api/beers/beersoutofstock/${action.payload}`)
    yield put({ type: 'FETCH_OUT_OF_STOCK_BEERS'});
  } catch (error) {
    alert(`Error marking beer back in stock`);
    console.log(`Error marking beer back in stock`);
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
  yield takeLatest('DELETE_BEER', deleteBeer);
  yield takeLatest('UPDATE_BEER_OUT_OF_STOCK', updateBeerOutStock);
  yield takeLatest('FETCH_OUT_OF_STOCK_BEERS', fetchOutOfStockBeers);
  yield takeLatest('UPDATE_BEER_IN_STOCK', updateBeerInStock);
}

export default beersSaga;
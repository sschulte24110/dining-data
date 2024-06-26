import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

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
    yield axios.put(`/api/beers/${action.payload.id}`, {name: action.payload.name, brewery: action.payload.brewery, beer_style: action.payload.beer_style, abv: action.payload.abv, photo_url: action.payload.photo_url, description: action.payload.description, out_of_stock: action.payload.out_of_stock, vendor_id: action.payload.vendor_id})
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

export const toggleStockRequest = (beerID, out_of_stock) => ({
  type: 'TOGGLE_STOCK_REQUEST',
  payload: { beerID, out_of_stock},
})

// function* toggleStockStatus(action) {
//   try {
//     const { beerID, out_of_stock } = action.payload;
//     yield call(axios.put, `api/beers/${beerID}`, { out_of_stock });
//     yield put({ type: 'TOGGLE_STOCK_SUCCESS', payload: { beerID, out_of_stock}})
//   } catch (error) {
//     console.log(`Error toggling stock status`);
//     yield put({ type: 'TOGGLE_ADMIN_FAILURE', error})
//   }
// }

function* beersSaga() {
  yield takeLatest('FETCH_BEERS', fetchBeers);
  yield takeLatest('ADD_BEER', addBeer);
  yield takeLatest('FETCH_STYLE_BEER', fetchStyleBeer);
  yield takeLatest('UPDATE_BEER', updateBeer);
  yield takeLatest('DELETE_BEER', deleteBeer);
  // yield takeLatest('TOGGLE_STOCK_REQUEST', toggleStockStatus)
}

export default beersSaga;
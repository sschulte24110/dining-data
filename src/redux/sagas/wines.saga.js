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
  } catch (error) {
    alert(`Error getting specific varietal of wine`);
    console.error(error);
  }
}

function* updateWineStock(action) {
  try {
    yield axios.put(`/api/wines/${action.payload}`);
    yield put({ type: 'FETCH_WINES'});
  } catch (error) {
    alert(`Error marking wine out of stock`);
    console.log(`Error marking wine out of stock`, error);
  }
}

function* updateWine(action) {
  try {
    yield axios.put(`/api/wines/${action.payload.id}`, {name_winery: action.payload.name_winery, wine_varietal_id: action.payload.wine_varietal_id, region: action.payload.region, year: action.payload.year, photo_url: action.payload.photo_url, description: action.payload.description, vendor_id: action.payload.vendor_id});
    yield put({ type: 'FETCH_WINES'})
  } catch (error) {
    alert(`Error editing wine`);
    console.log(`Error editing wine`, error);
  }
}

function* deleteWine(action) {
  try {
    yield axios.delete(`api/wines/${action.payload}`);
    yield put({ type: 'FETCH_WINES'});
  } catch (error) {
    alert(`Error deleting beer`);
    console.log(`Error deleting beer`, error);
  }
}

function* winesSaga() {
  yield takeLatest('FETCH_WINES', fetchWines)
  yield takeLatest('FETCH_VARIETAL_WINE', fetchWineByVarietal);
  yield takeLatest('ADD_WINE', addWine),
  yield takeLatest('UPDATE_WINE', updateWine),
  yield takeLatest('DELETE_WINE', deleteWine),
  yield takeLatest('UPDATE_WINE_STOCK', updateWineStock)
}

export default winesSaga;
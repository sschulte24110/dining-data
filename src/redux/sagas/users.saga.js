import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUsers() {
  try { 
    const response = yield axios.get('api/user/users');
    yield put({ type: 'SET_USERS', payload: response.data})
  } catch (error) {
    console.error(`Error getting users`);
  }
}

function* usersSaga() {
  yield takeLatest('FETCH_USERS', fetchUsers)
}

export default usersSaga;
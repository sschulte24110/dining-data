import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* deleteUser(action) {
  try {
    yield axios.delete(`api/user/${action.payload}`);
    yield put({ type: 'FETCH_USERS'})
  } catch (error) {
    alert(`Error deleting user`);
    console.log(`Error deleting user`, error);
  }
}

export const toggleAdminRequest = (userID, isAdmin) => ({
  type: 'TOGGLE_ADMIN_REQUEST',
  payload: { userID, isAdmin },
})

function* toggleAdminStatus(action) {
  try {
    const { userID, isAdmin } = action.payload;
    yield call(axios.put, `api/user/${userID}/admin`, { isAdmin });
    yield put({ type: 'TOGGLE_ADMIN_SUCCESS', payload: { userID, isAdmin }})
  } catch (error) {
    console.log(`Error toggling admin status`);
    yield put({ type: 'TOGGLE_ADMIN_FAILURE', error})
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('DELETE_USER', deleteUser);
  yield takeLatest('TOGGLE_ADMIN_REQUEST', toggleAdminStatus)
}

export default userSaga;

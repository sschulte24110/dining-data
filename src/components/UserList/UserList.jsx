import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toggleAdminRequest } from '../../redux/sagas/user.saga';

export default function UserList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector((store) => store.users);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
  }, []);

  const deleteUser = (userID) => {
    dispatch({ type: 'DELETE_USER', payload: userID });
  };

  const toggleAdmin = (userID, isAdmin) => {
    dispatch(toggleAdminRequest(userID, isAdmin));
  }

  return (
    <div>
      <div>
        <ul className='users'>
          {users.map((user) => (
            <div key={user.id}>
              <li key={user.id}>{user.name}</li>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={user.admin_status}
                  onChange={(e) => toggleAdmin(user.id, e.target.checked)}
                  id={'adminCheck${user.id'}
                />
                <label className='form-check-label'>
                  Admin
                </label>
              </div>
              <button
                onClick={() => deleteUser(user.id)}
                className='btn btn-outline-secondary btn-sm'
              >
                Delete
              </button>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

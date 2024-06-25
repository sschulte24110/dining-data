import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toggleAdminRequest } from '../../redux/sagas/user.saga';
import './UserList.css';

export default function UserList({ user }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
  }, []);

  const deleteUser = (userID) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch({ type: 'DELETE_USER', payload: userID });
      // deleteUser(userID);
    }
  };

  const toggleAdmin = (userID, isAdmin) => {
    dispatch(toggleAdminRequest(userID, isAdmin));
  };

  return (
    <>
          <tr>
            <td>{user.name}</td>
            <td className='admin-info'>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={user.admin_status}
                  onChange={(e) => toggleAdmin(user.id, e.target.checked)}
                  id={'adminCheck${user.id'}
                />
                <label className='form-check-label'>Admin</label>
              </div>
            </td>
            <td className='admin-info'>
              <button
                onClick={() => deleteUser(user.id)}
                className='btn btn-outline-secondary btn-sm'
              >
                Delete
              </button>
            </td>
          </tr>
    </>
  );
}

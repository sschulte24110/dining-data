import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserList from '../UserList/UserList';
import './UserPage.css';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const users = useSelector((store) => store.users);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
    window.scrollTo(0, 0);
  }, []);

  const user = useSelector((store) => store.user);
  return (
    <>
    <div className='container'>
        <div className='users-header'>
          <h6
            className='user-home-button'
            onClick={() => history.push('/home')}
          >
            Home
          </h6>
          <h1 className='user-heading'>Manage Users</h1>
        </div>
      <div>
        <div className='user-info'>
          <h3>Welcome, {user.name}!</h3>
          
        </div>
      </div>
      <div>
        <table className='table table-striped table-bordered'>
          <tr>
            <th>User</th>
            <th>Admin Status</th>
            <th>Delete</th>
          </tr>
          <tbody>
            {users.map((user) => (
              <UserList key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
export default UserPage;

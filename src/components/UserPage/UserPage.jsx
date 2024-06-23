import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserList from '../UserList/UserList';
import './UserPage.css';

function UserPage() {
const history = useHistory()

  const user = useSelector((store) => store.user);
  return (
    <div className='container'>
      <div>
        <div className='users-header'>
          <h6 className='user-home-button' onClick={() => history.push('/home')}>Home</h6>
          <h1>Manage Users</h1>
        </div>
        <div className='user-info'>
          <h3>Welcome, {user.name}!</h3>
          <p>Your ID is: {user.id}</p>
        </div>
      </div>
      <div>
        <UserList />
      </div>

      
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;

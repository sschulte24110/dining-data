import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className='nav'>
      {/* <Link to='/home'>
        <img src='./images/dining-data-vert.png' alt="Dining Data Logo" />
      </Link> */}
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className='navLink' to='/login'>
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className='navLink' to='/home'>
              Home
            </Link>

            {/* <Link className='navLink' to='/info'>
              Info Page
            </Link> */}

            <Link className='navLink' to='/beers'>
              Beers
            </Link>

            <Link className='navLink' to='/vendors'>
              Vendors
            </Link>

            <LogOutButton className='navLink' />
          </>
        )}

        <Link className='navLink' to='/about'>
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;

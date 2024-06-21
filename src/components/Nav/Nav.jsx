import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBeer,
  faWineGlassAlt,
  faStoreAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

function Nav() {
  const dispatch = useDispatch();
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
          <>
          <Link className='nav-link' to='/login'>
            Login / Register
          </Link>
          <Link className='nav-link' to='/about'>
          About
        </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <li className='nav-item'>
              <Link className='nav-link' to='/home'>
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/beerstyle'>
                <FontAwesomeIcon icon={faBeer} /> Beers
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/winevarietals'>
                <FontAwesomeIcon icon={faWineGlassAlt} /> Wines
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/vendors'>
                <FontAwesomeIcon icon={faStoreAlt} /> Vendors
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/login'
                onClick={() => dispatch({ type: 'LOGOUT' })}
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> LogOut
              </Link>
            </li>
          </>
        )}

        {/* <Link className='navLink' to='/about'>
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;

{
  /* <LogOutButton className='navLink' /> */
}

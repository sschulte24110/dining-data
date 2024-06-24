import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './Home.css';

export default function Home() {
  const history = useHistory();
  const user = useSelector((store) => store.user);

  return (
    <div className='container'>
      <img
        className='home-logo'
        src='../images/dining-data-vert-2.png'
        alt='Dining Data logo'
      />
      <br />
      <div className='home-icons'>
        <div
          className='beer-home-icon'
          onClick={() => history.push('/beerstyle')}
        >
          {/* <img src='../images/icons8-beer-mug-99.png' alt='Beer Mug Icon' /> */}
          <h1 className='home-icon-text'>Beer</h1>
        </div>
        <br />
        <div
          className='wine-home-icon'
          onClick={() => history.push('/winevarietals')}
        >
          {/* <img
            src='../images/icons8-wine-glass-100 (1).png'
            alt='Wine Glass Icon'
          /> */}
          <h1 className='home-icon-text'>Wine</h1>
        </div>
        <br />
        <div
          className='vendor-home-icon'
          onClick={() => history.push('/vendors')}
        >
          {/* <img
            src='../images/icons8-delivery-truck-100.png'
            alt='Delivery Truck Icon'
          /> */}
          <h1 className='home-icon-text'>Vendors</h1>
        </div>
        <br />
        {user.admin_status && (
          <div
            className='user-home-icon'
            onClick={() => history.push('/user')}
          >
            {/* <img src='../images/icons8-user-96.png' alt='User Icon' /> */}
            <h1 className='home-icon-text'>Users</h1>
          </div>
        )}
      </div>
    </div>
  );
}

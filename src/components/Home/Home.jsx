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
        src='../images/dining-data-vert.png'
        alt='Dining Data logo'
      />
      <br />
      <br />
      <div className='home-icons'>
        <div
          className='home-icon-button'
          onClick={() => history.push('/beerstyle')}
        >
          <img src='../images/icons8-beer-mug-99.png' alt='Beer Mug Icon' />
          <h2>Beer</h2>
        </div>
        <br />
        <div
          className='home-icon-button'
          onClick={() => history.push('/winevarietals')}
        >
          <img
            src='../images/icons8-wine-glass-100 (1).png'
            alt='Wine Glass Icon'
          />
          <h2>Wine</h2>
        </div>
        <br />
        <div
          className='home-icon-button'
          onClick={() => history.push('/vendors')}
        >
          <img
            src='../images/icons8-delivery-truck-100.png'
            alt='Delivery Truck Icon'
          />
          <h2>Vendors</h2>
        </div>
        <br />
        {user.admin_status && (
          <div
            className='home-icon-button'
            onClick={() => history.push('/user')}
          >
            <img src='../images/icons8-user-96.png' alt='User Icon' />
            <h2>Users</h2>
          </div>
        )}
      </div>
    </div>
  );
}

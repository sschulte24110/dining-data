import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
          <h1 className='home-icon-text'>Beer</h1>
        </div>
        <br />
        <div
          className='wine-home-icon'
          onClick={() => history.push('/winevarietals')}
        >
          <h1 className='home-icon-text'>Wine</h1>
        </div>
        <br />
        <div
          className='vendor-home-icon'
          onClick={() => history.push('/vendors')}
        >
          <h1 className='home-icon-text'>Vendors</h1>
        </div>
        <br />
        {user.admin_status && (
          <div
            className='user-home-icon'
            onClick={() => history.push('/user')}
          >
            <h1 className='home-icon-text'>Users</h1>
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
       <img className='login-logo' src="../images/dining-data-vert.png" alt="Dining Data Logo" />
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Not a user? Register here.
        </button>
      </center>
    </div>
  );
}

export default LoginPage;

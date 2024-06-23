import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className='container'>
      <form className='formPanel' onSubmit={login}>
      <h2>Sign In</h2>
        {errors.loginMessage && (
          <h3 className='alert' role='alert'>
            {errors.loginMessage}
          </h3>
        )}
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              className='form-control custom-margin'
              name='username'
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              className='form-control custom-margin'
              name='password'
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div>
          <input
            className='btn btn-outline-secondary'
            type='submit'
            name='submit'
            value='Sign In'
          />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        name: name,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <div className='container'>
      <form className='formPanel' onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className='alert' role='alert'>
            {errors.registrationMessage}
          </h3>
        )}
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              name='name'
              className='form-control custom-margin'
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              name='username'
              className='form-control custom-margin'
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className='col-lg-12'>
          <div className='mb-3'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              className='form-control custom-margin'
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>
        <div>
          <input
            className='btn btn-outline-secondary'
            type='submit'
            name='submit'
            value='Register'
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;

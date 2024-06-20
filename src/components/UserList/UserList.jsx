import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function UserList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const users = useSelector((store) => store.users);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
  }, []);

  const deleteUser = (userID) => {
    dispatch({ type: 'DELETE_USER', payload: userID})
    
  }

  return (
    <div>
      <div>
        <ul className='users'>
          {users.map((user) => (
            <div key={user.id}>
              <li key={user.id}>{user.name}</li>
              <button onClick={() => deleteUser(user.id)} className='btn btn-outline-secondary btn-sm'>🗑️</button>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

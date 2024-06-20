import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function UserList() {
  const dispatch = useDispatch();

  const users = useSelector((store) => store.users);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
  }, []);

  return (
    <div>
      <div>
        <ul className='users'>
          {users.map((user) => (
            <div>
              <li key={user.id}>{user.name}</li>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

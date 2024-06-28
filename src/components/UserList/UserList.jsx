import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toggleAdminRequest } from '../../redux/sagas/user.saga';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './UserList.css';

export default function UserList({ user }) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_USERS' });
    window.scrollTo(0, 0);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteUser = (userID) => {
    dispatch({ type: 'DELETE_USER', payload: userID });
  };

  const toggleAdmin = (userID, isAdmin) => {
    dispatch(toggleAdminRequest(userID, isAdmin));
  };

  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td className='admin-info'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              checked={user.admin_status}
              onChange={(e) => toggleAdmin(user.id, e.target.checked)}
              id={'adminCheck${user.id'}
            />
            <label className='form-check-label'>Admin</label>
          </div>
        </td>
        <td className='admin-info'>
          <Button variant='secondary' onClick={handleShow}>
            Delete
          </Button>
        </td>
      </tr>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete User?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button onClick={() => deleteUser(user.id)} variant='primary'>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

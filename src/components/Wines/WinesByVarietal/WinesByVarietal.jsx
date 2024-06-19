import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './WinesByVarietal.css';

export default function WinesByVarietal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const wines = useSelector((store) => store.wines);

  useEffect(() => {
    dispatch({ type: ''})
  })

  return (
    <div>

    </div>
  )
}
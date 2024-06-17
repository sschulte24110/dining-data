import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Beers() {
  const beers = useSelector((store) => store.beersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_BEERS'})
  }, [])
  
  return (
    <>
    <h2>Beers</h2>
      <ul>
        {beers.map((beer, i) => <li key={i}>{beer.name}</li>)}
      </ul>
    </>
  )
}
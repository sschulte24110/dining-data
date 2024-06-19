import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

export default function BeerStyleList({ style }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/beers/${style.id}`);
  };

  return (
    <div>
      <div onClick={handleClick}>
        <li key={style.id}>{style.beer_style}</li>
        <hr />
      </div>
    </div>
  );
}

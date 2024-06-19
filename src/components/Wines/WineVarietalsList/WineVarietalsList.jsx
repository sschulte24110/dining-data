import { useHistory } from 'react-router-dom';

export default function WineVarietalsList({varietal}) {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/winesbyvarietal/${varietal.id}`);
  }

  return (
    <div onClick={handleClick}>
      <li key={varietal.id}>
        {varietal.wine_varietal}
      </li>
      <hr />
    </div>
  )
}
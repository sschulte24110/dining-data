import axios from 'axios';
import { useState } from 'react';

export default function BeerSearch() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('api/beers', {
        params: { search }
      })
      setResults(response.data);
    } catch (error) {
      console.error(`Error fetching beer results`, error)
    }
  }  

  return (
    <div>
      <form>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder="Search for beers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='input-group-append'>
            <button className='btn btn-outline-secondary' onClick={handleSearch} >
              Search
            </button>
            <ul>
              {results.map((beer, index) => {
                <li key={index}>
                  {beer.name} - {beer.brewery}
                </li>
              })}
            </ul>
          </div>
        </div>
      </form>
    </div>
  )
}
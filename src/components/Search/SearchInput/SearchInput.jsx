export default function SearchInput() {
  return (
    <div>
      <form>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder="Search"
            aria-label="Search"
            aria-describedby='basic-addon2'
          />
          <div className='input-group-append'>
            <button className='btn btn-outline-secondary' type='button'>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

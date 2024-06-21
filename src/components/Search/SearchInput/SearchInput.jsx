import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchInput() {
  const beers = useSelector((store) => store.beers);
  const history = useHistory();


  return (
    <div className='search-form'>
      <Stack spacing={3} sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={beers}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search beer by name'
              id='outlined-size-small'
              size='small'
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
          onChange={(event, value) => {
            if (value) {
              history.push(`/editbeer/${value.id}`);
            }
          }}
        />
      </Stack>
    </div>
  );
}

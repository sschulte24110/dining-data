import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './WineSearch.css';

export default function WineSearch() {
  const wines = useSelector((store) => store.wines);
  const history = useHistory();

  return (
    <div className='search-form'>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={wines}
          getOptionLabel={(option) => `${option.name_winery}: ${option.region}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search wine by name, winery, region'
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
              history.push(`/winesbyvarietal/editwine/${value.id}`);
            }
          }}
        />
      </Stack>
    </div>
  );
}
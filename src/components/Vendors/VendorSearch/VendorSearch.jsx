import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import './VendorSearch.css';

export default function VendorSearch() {
  const vendors = useSelector((store) => store.vendors);
  const history = useHistory();

  return (
    <div className='search-form'>
      <Stack spacing={3} sx={{ width: '100%' }}>
        <Autocomplete
          freeSolo
          id='free-solo-2-demo'
          disableClearable
          options={vendors}
          getOptionLabel={(option) => option.vendor_name}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Search vendors by name'
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
              history.push(`/editvendor/${value.id}`);
            }
          }}
        />
      </Stack>
    </div>
  );
}
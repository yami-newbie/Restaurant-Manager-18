import ListTable from '../components/ListTable'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import { Card } from '@mui/material';
import { Box } from '@mui/system';

function OrderTable() {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", m: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Date desktop"
            sx={{ width: 200 }}
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{m: 5, border:"1px solid #ccc!important"}}>
        <ListTable />
      </Box>
    </Box>
  );
}

export default OrderTable
import { Box, Paper, TextField } from '@mui/material';
import React, { useState } from 'react'
import ListOrder from '../../components/ListOrder';

function QuanLyHoaDon({ list = [1, 1, 1, 1, 1, 1] }) {
  const [search, setSearch] = useState();
  return (
    <Box>
      <Box>
        <Paper sx={{ m: 1 }}>
          <TextField
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            label="Tìm kiếm"
          />
        </Paper>
      </Box>
      <Box sx={{ overflow: "auto", height: window.innerHeight }}>
        <Box sx={{ mx: 2, mt: 2 }}>
          <ListOrder list={list} />
        </Box>
      </Box>
    </Box>
  );
}

export default QuanLyHoaDon
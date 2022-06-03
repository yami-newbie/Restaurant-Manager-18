import { Box, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ListOrder from '../../components/QuanLyHoaDon/ListOrder';
import {useOrderService} from "../../services/hoadon.service";

function QuanLyHoaDon({ list = [1, 1, 1, 1, 1, 1] }) {
  const [search, setSearch] = useState();
  const [listOrder, setListOrder] = useState([]);
  const dataService = useOrderService();

  useEffect(() => {
    setListOrder(dataService.orders);

  }, [dataService]);

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
          <ListOrder list={listOrder} />
        </Box>
      </Box>
    </Box>
  );
}

export default QuanLyHoaDon
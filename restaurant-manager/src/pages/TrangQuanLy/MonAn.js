import { Avatar, Box, Button, IconButton, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ListDish from '../../components/ListDish'
import AddIcon from '@mui/icons-material/Add';
import DishDetail from '../../components/DishDetail';
import { useDishService } from '../../services/thucan.service';

function QuanLyMonAn() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dishList, setDishList] = useState();
  const [haveRes, setHaveRes] = useState();

  const dishService = useDishService();

  useEffect(() => {
    // console.log(dishService.dishes);
    setDishList(dishService.dishes);
  }, [dishService])

  useEffect(() => {
    if(search && search !== ""){
      const result = dishList.map((dish) =>
        String(dish.data.TenThucAn).toLowerCase().includes(search) ? dish : null
      );
      var lastRes = [];

      result.map(res => res !== null ? lastRes = [...lastRes, res] : res)

      if(lastRes.length === 0){
        lastRes = dishService.dishes;
        setHaveRes(false);
      }
      else {
        setHaveRes(true);
      }

      setDishList(lastRes);
    }
    else{
      setHaveRes(true);
      setDishList(dishService.dishes);
    }
  }, [dishService.dishes, search])

  const onCreateNewDish = () => {
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Box>
        <Paper sx={{ m: 1 }}>
          <TextField
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            helperText= {!haveRes ? "Không tìm thấy kết quả nào" : null}
            value={search}
            label="Tìm kiếm"
          />
        </Paper>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          height: window.innerHeight,
        }}
      >
        <ListDish listDish={dishList} />
      </div>
      <div style={{ position: "absolute", right: "32px", bottom: "32px" }}>
        <IconButton onClick={onCreateNewDish} color="primary">
          <AddIcon sx={{ width: 40, height: 40 }} />
        </IconButton>
      </div>
      <DishDetail add={true} onClose={onClose} open={open} />
    </div>
  );
}

export default QuanLyMonAn
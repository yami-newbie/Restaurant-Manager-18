import { Avatar, Button, IconButton } from '@mui/material';
import React, { useState } from 'react'
import ListDish from '../../components/ListDish'
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DishDetail from '../../components/DishDetail';

function QuanLyMonAn() {
  const [open, setOpen] = useState(false);
  const [newDish, setNewDish] = useState({
    name: "",
    imgUrl: "",
    price: 0,
    enable: true,
    description: "",
  });

  const onCreateNewDish = () => {
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
      <div>
        <ListDish />
      </div>
      <div style={{ position: "absolute", right: "32px", bottom: "32px" }}>
        <IconButton onClick={onCreateNewDish} color="primary">
          <AddIcon sx={{ width: 40, height: 40 }} />
        </IconButton>
      </div>
      <DishDetail dish={newDish} onClose={onClose} open={open} />
    </div>
  );
}

export default QuanLyMonAn
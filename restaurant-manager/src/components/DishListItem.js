import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Rating, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import DishDetail from './DishDetail';
import EditIcon from "@mui/icons-material/Edit";

function DishListItem({
  dish = {
    name: "Món ví dụ",
    price: 150000,
    rating: 2,
    enable: true,
    imgSrc: "/avatar/94702183_p0.jpg",
  },
}) {
  const [value, setValue] = useState(dish.rating);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(dish.enable)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCheckedChange = (e) => {
    setChecked(e.target.checked);
  }

  var formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          mx: 1,
          mt: 6,
          mb: 1,
          width: 200,
          borderRadius: "1.5rem",
        }}
      >
        <CardContent sx={{ mt: 7 }}>
          <Typography
            sx={{ fontWeight: "bolder !important" }}
            component="div"
            variant="h6"
          >
            {dish.name}
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <Typography
            sx={{ fontWeight: "bolder !important" }}
            component="div"
            variant="h7"
          >
            {formatter.format(dish.price)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", ml: 1.5 }}>
          <IconButton color="primary" aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
          <Switch checked={checked} onChange={onCheckedChange} />
        </CardActions>
      </Card>
      <CardMedia
        component="img"
        sx={{
          position: "absolute",
          width: 100,
          borderRadius: "100px",
        }}
        image={dish.imgSrc}
        alt="food"
      />
      <DishDetail open={open} onClose={handleClose} />
    </Box>
  );
}

export default DishListItem;
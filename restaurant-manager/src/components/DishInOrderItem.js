import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, IconButton, Rating, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { formatter } from "../services/uilts/formatPrice";

function DishInOrderItem({
  dish = {
    name: "Món ví dụ",
    price: 150000,
    imgUrl: "/avatar/94702183_p0.jpg",
    amount: 1,
    rating: 2,
  },
}) {
  const [amount, setAmount] = useState(dish.amount);

  const AddAmount = () => {
    setAmount(amount + 1);
  };
  const RemoveAmount = () => {
    if (amount > 1) setAmount(amount - 1);
  };
  return (
    <Card sx={{ display: "flex", width: "100%", borderRadius: 3 }}>
      <CardContent
        sx={{ width: "100%", display: "flex", alignItems: "center" }}
      >
        <Avatar sx={{ width: "64px", height: "64px", mr: 2 }} src={dish.imgUrl} />
        <Grid
          container
          columns={{ xs: 5, md: 10, sm: 5 }}
          spacing={{ xs: 0, md: 3, sm: 0 }}
          sx={{
            width: "100%",
            ml: 2,
            alignItems: "center",
          }}
        >
          <Grid item xs={5} md={5} sm={5}>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bolder !important" }}
              >
                {dish.name}
              </Typography>
              <Rating readOnly value={dish.rating} />
            </Box>
          </Grid>
          <Grid item xs={5} md={5} sm={5}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Typography variant="h7" component="div">
                {formatter.format(dish.price)}
              </Typography>
              <Stack
                sx={{ alignItems: "center", justifyContent: "right" }}
                direction="row"
              >
                <IconButton color="primary" onClick={RemoveAmount}>
                  <RemoveCircleOutlineRoundedIcon />
                </IconButton>
                <Typography variant="h7" component="div">
                  {amount}
                </Typography>
                <IconButton color="primary" onClick={AddAmount}>
                  <AddCircleOutlineRoundedIcon />
                </IconButton>
              </Stack>
              <Typography
                sx={{ fontWeight: "bolder !important" }}
                variant="h7"
                component="div"
              >
                {formatter.format(dish.price * amount)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DishInOrderItem
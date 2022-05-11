import { Grid } from '@mui/material'
import React from 'react'
import DishListItem from "./DishListItem";

function ListDish({ listDish = [1, 2, 3, 4, 1, 1, 1, 1, 1, 1] }) {
  
  return (
    <Grid container spacing={2} sx={{ m: 5 }}>
      {listDish.map((dish, index) => {
        return (
          <Grid item key={index}>
            <DishListItem />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ListDish
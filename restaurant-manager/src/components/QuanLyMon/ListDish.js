import { Grid } from '@mui/material'
import React from 'react'
import DishListItem from "./DishListItem";

function ListDish({ listDish = [] }) {
  return (
    <Grid container spacing={2} sx={{ m: 2 }}>
      {listDish.map((dish, index) => {
        return (
          <Grid item key={index}>
            <DishListItem dish={dish}/>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ListDish
import { Grid } from "@mui/material";
import React from "react";
import DishListItem from "./DishListItem";

function ListDish({ listDish = [] }) {
  return (
    <Grid container spacing={2} columns={10} sx={{ my: 2, width: "95%" }}>
      {listDish.map((dish, index) => {
        return (
          <Grid item key={index} sm={5} md={2}>
            <DishListItem dish={dish} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ListDish;

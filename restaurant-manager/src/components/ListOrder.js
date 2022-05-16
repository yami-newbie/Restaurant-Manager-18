import { Box, Grid } from "@mui/material";
import React from "react";
import OrderListItem from "./OrderListItem";

function ListOrder({ list }) {

  

  return (
    <Box>
      <Grid columns={{ xs: 6, md: 12, sm: 6 }} spacing={3} container>
        {list.map((order, index) => (
          <Grid item key={index} xs={6} md={6} sm={6}>
            <OrderListItem order={order} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListOrder;

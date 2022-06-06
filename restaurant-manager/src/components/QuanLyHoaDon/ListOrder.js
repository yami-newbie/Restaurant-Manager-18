import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";

function ListOrder({ list }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if(list){
      setOrders(list);
    }
  }, [list])

  return (
    <Box>
      <Grid columns={{ xs: 6, md: 12, sm: 6 }} spacing={3} container>
        {orders?.map((order, index) => (
          <Grid item key={index} xs={6} md={6} sm={6}>
            <OrderListItem order={order} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ListOrder;

import { List, ListItem } from '@mui/material'
import React from 'react'
import DishInOrderItem from './DishInOrderItem'

function ListDishOrder({list}) {
  return (
    <List sx={{ overflow: "auto", maxHeight: 460 }}>
      {list.map((dish, index) => {
        return (
          <ListItem key={index}>
            <DishInOrderItem />
          </ListItem>
        );
      })}
    </List>
  );
}

export default ListDishOrder
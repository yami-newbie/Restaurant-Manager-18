import { List, ListItem } from '@mui/material'
import React from 'react'
import DishInOrderItem from './DishInOrderItem'

function ListDishOrder({list}) {
  return (
    <List sx={{ overflow: "auto", maxHeight: 460 }}>
      {list.map((ct, index) => {
        return (
          <ListItem key={index}>
            <DishInOrderItem ct={ct} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default ListDishOrder
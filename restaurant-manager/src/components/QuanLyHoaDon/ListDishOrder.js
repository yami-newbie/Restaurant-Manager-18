import { List, ListItem } from '@mui/material'
import React from 'react'
import DishInOrderItem from './DishInOrderItem'

function ListDishOrder({list, setList}) {
  const setCt = (_ct) => {
    setList(list.map(ct => ct.id === _ct.id ? _ct : ct))
  }
  return (
    <List sx={{ overflow: "auto", maxHeight: 460 }}>
      {list.map((ct, index) => {
        return (
          <ListItem key={index}>
            <DishInOrderItem ct={ct} setCt={setCt} />
          </ListItem>
        );
      })}
    </List>
  );
}

export default ListDishOrder
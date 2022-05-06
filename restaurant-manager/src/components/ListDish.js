import { List, ListItem } from '@mui/material'
import React from 'react'
import DishDetails from './DishDetails'

function ListDish({listDish = [1, 2, 3, 4]}) {
    console.log(listDish);

  return (
    <List sx={{width: "500px"}}>
        {
            listDish.map((dish, index) => {
                return (
                  <ListItem key={index}>
                    <DishDetails />
                  </ListItem>
                );
            })
        }
    </List>
  )
}

export default ListDish
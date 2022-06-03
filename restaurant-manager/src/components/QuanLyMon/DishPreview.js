import { Card, CardContent, CardMedia } from '@mui/material'
import React from 'react'

function DishPreview() {
  const [value, setValue] = React.useState(2);
  
  return (
    <Card>
      <CardMedia 
        component = "jpg"
        height = "140"
        image="\img\restaurant-le-47.jpg"
        alt="food"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Food
        </Typography>
        <Rating name="read-only" value={value} readOnly />
      </CardContent>
    </Card>
  )
}

export default DishPreview
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

function DishDetails() {
  return (
    <Card sx={{ width: "100%", m: 1 }}>
      <CardActionArea sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151, padding: "20px" }}
          image="/avatar/94702183_p0.jpg"
          alt="food"
        />
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            Tên món
          </Typography>
          <Typography component="div" variant="h6">
            Khẩu phần ăn
          </Typography>
          <Typography component="div" variant="h6">
            Giá
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default DishDetails
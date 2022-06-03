import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating, Switch, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import DishDetail from './DishDetail';
import EditIcon from "@mui/icons-material/Edit";
import { formatter } from '../../services/uilts/formatPrice';
import { useDishService } from '../../services/thucan.service';

function DishListItem({ dish }) {
  const [value, setValue] = useState(0);
  const [openDetail, setOpenDetail] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState(0);
  const [imgSrc, setImgSrc] = useState();
  const [dishData, setDishData] = useState();
  const [id, setId] = useState();

  const dataService = useDishService();

  useEffect(() => {
    if(dish){
      const data = dish.data;
      setChecked(data.Enable);
      setName(data.TenThucAn);
      setImgSrc(data.ImgSrc);
      setValue(data.Rating);
      setPrice(data.Gia);
      setDishData(dish);
      setId(dish.id);
    }
  }, [dish])

  const handleClickOpen = () => {
    setOpenDetail(true);
  };

  const handleClose = () => {
    setOpenDetail(false);
  };

  const onCheckedChange = (e) => {
    if(id){
      dataService.updateThucAn(id, { ...dish.data, Enable: e.target.checked });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          mx: 1,
          mt: 6,
          mb: 1,
          width: 200,
          borderRadius: "1.5rem",
        }}
      >
        <CardContent sx={{ mt: 7 }}>
          <Typography
            sx={{ fontWeight: "bolder !important" }}
            component="div"
            variant="h6"
          >
            {name}
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              if (id) {
                dataService.updateThucAn(id, {
                  ...dish.data,
                  Rating: newValue,
                });
              }
            }}
          />
          <Typography
            sx={{ fontWeight: "bolder !important" }}
            component="div"
            variant="h7"
          >
            {formatter.format(price)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", ml: 1.5 }}>
          <IconButton
            onClick={() => {
              if (dish && dish.data) {
                setOpenConfirm(true);
                // dataService.deleteThucAn(dish.id);
              }
            }}
            color="primary"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
          <Switch checked={checked} onChange={onCheckedChange} />
        </CardActions>
      </Card>
      <CardMedia
        component="img"
        sx={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: "100px",
        }}
        image={imgSrc}
        alt="food"
      />
      <DishDetail
        update={true}
        dish={dishData}
        open={openDetail}
        onClose={handleClose}
      />
      <Dialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
      >
        <DialogTitle sx={{ bgcolor: "rgba(28, 46, 80, 1)", color: "#FFF" }}>
          <Typography variant="h5" component="div">
            Xác nhận xóa món ăn
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ m: 2 }}>
          <Typography variant="h6" component="div">
            Bạn có xác nhận xóa món ăn này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenConfirm(false);
            }}
            variant="outlined"
          >
            Hủy
          </Button>
          <Button
            onClick={() => {
              setOpenConfirm(false);
              dataService.deleteThucAn(dish.id);
            }}
            variant="contained"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DishListItem;
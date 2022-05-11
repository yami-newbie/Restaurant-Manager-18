import { Avatar, Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Stack, styled, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { green } from '@mui/material/colors';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

function DishDetail({
  onClose = null,
  open = false,
  dish = {
    imgUrl: "/avatar/94702183_p0.jpg",
    name: "Món ví dụ",
    price: 150000,
    description: "Giới thiệu linh tinh về món ăn :v",
    enable: true,
  },
}) {
  const sizeImg = 100;
  const [selected, setSelected] = useState(true);
  const [imgUrl, setImgUrl] = useState(dish.imgUrl);
  const [price, setPrice] = useState(dish.price);
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);

  const onSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const onChangeImg = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => {
      setImgUrl(e.target.result);
    };
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      PaperComponent="div"
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tooltip placement="top" title="Bấm để thay đổi hình ảnh">
          <>
            <label htmlFor="load-file">
              <Avatar
                sx={{ width: sizeImg, height: sizeImg, cursor: "pointer" }}
                src={imgUrl}
              />
            </label>
            <input
              onChange={onChangeImg}
              accept="image/*"
              id="load-file"
              type="file"
              hidden
            />
          </>
        </Tooltip>
      </Box>
      <Paper sx={{ mt: "40px", pt: "60px", borderRadius: "1rem" }}>
        <DialogTitle>
          <Typography
            textAlign="center"
            variant="h5"
            gutterBottom
            component="div"
          >
            Chi tiết món ăn
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              variant="standard"
              value={name}
              fullWidth
              label="Tên món ăn"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              variant="standard"
              value={price}
              fullWidth
              label="Giá"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <TextField
              variant="standard"
              select
              value={selected}
              onChange={onSelectChange}
              fullWidth
              label="Trạng thái"
            >
              <MenuItem value={true}>Kinh doanh</MenuItem>
              <MenuItem value={false}>Tạm dừng</MenuItem>
            </TextField>
            <TextField
              variant="outlined"
              fullWidth
              value={description}
              multiline
              rows={5}
              label="Giới thiệu"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={onClose}>Xác nhận</Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default DishDetail
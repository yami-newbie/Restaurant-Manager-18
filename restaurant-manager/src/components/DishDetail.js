import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDishService } from '../services/thucan.service';
const srcDefault =
  "https://firebasestorage.googleapis.com/v0/b/quanlynhahang-b44c4.appspot.com/o/images%2Fmeal-food.png?alt=media&token=f3f76cc9-c74d-4b08-9de9-b408e7745c42";
function DishDetail({
  onClose = null,
  open = false,
  dish = null,
  update = false,
  add = false,
}) {
  const sizeImg = 100;
  const [Enable, setSelected] = useState(true);
  const [ImgSrc, setImgSrc] = useState();
  const [Gia, setPrice] = useState();
  const [TenThucAn, setName] = useState();
  const [GioiThieu, setDescription] = useState();
  const [id, setId] = useState();
  const [file, setFile] = useState();

  const service = useDishService();

  useEffect(() => {
    if (open === false) {
      if (dish && dish.data) {
        const data = dish.data;
        setName(data.TenThucAn);
        setImgSrc(data.ImgSrc);
        setPrice(data.Gia);
        setSelected(data.Enable);
        setDescription(data.GioiThieu);
      }else if(add){
        setName("");
        setImgSrc("");
        setPrice(0);
        setSelected(true);
        setDescription("");
      }
    }
  }, [open, dish]);

  useEffect(() => {
    if (dish && dish.data) {
      const data = dish.data;
      setId(dish.id);
      setName(data.TenThucAn);
      setImgSrc(data.ImgSrc);
      setPrice(data.Gia);
      setSelected(data.Enable);
      setDescription(data.GioiThieu);
    }
  }, [dish]);

  const onUpdate = () => {
    if (dish && dish.data) {
      if (ImgSrc !== dish.data.ImgSrc) {
        service.uploadImg(file).then((res) => {
          const after = {
            TenThucAn: TenThucAn,
            ImgSrc: res,
            Gia: Number(Gia),
            Enable: Enable,
            GioiThieu: GioiThieu,
          };
          const newDish = { ...dish.data, ...after };
          service.updateThucAn(id, newDish);
        });
      } else {
        const after = {
          TenThucAn: TenThucAn,
          Gia: Number(Gia),
          Enable: Enable,
          GioiThieu: GioiThieu,
        };
        const newDish = { ...dish.data, ...after };
        service.updateThucAn(id, newDish);
      }
    }
    onClose();
  };

  const onAdd = () => {
    if (ImgSrc !== "") {
      service.uploadImg(file).then((res) => {
        const newDish = {
          Rating: 0,
          TenThucAn: TenThucAn,
          ImgSrc: res,
          Gia: Number(Gia),
          Enable: Enable,
          GioiThieu: GioiThieu,
        };
        service.addThucAn(newDish);
      });
    } else {
      const newDish = {
        TenThucAn: TenThucAn,
        Rating: 0,
        ImgSrc: srcDefault,
        Gia: Number(Gia),
        Enable: Enable,
        GioiThieu: GioiThieu,
      };
      service.addThucAn(newDish);
    }
    onClose();
  };

  const onSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const onChangeImg = (e) => {
    var _file = e.target.files[0];
    setFile(_file);
    var reader = new FileReader();
    reader.readAsDataURL(_file);
    reader.onloadend = (e) => {
      setImgSrc(e.target.result);
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
                src={ImgSrc}
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
              value={TenThucAn}
              fullWidth
              label="Tên món ăn"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              variant="standard"
              type="number"
              value={Gia}
              fullWidth
              label="Giá"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <TextField
              variant="standard"
              select
              value={Enable}
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
              value={GioiThieu}
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
          <Button onClick={() => (update ? onUpdate() : onAdd())}>
            Xác nhận
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default DishDetail
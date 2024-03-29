import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlertService } from "../../services/alert.service";
import { danhmuc } from "../../services/Const";
import { useDishService } from "../../services/thucan.service";


const srcDefault =
  "https://firebasestorage.googleapis.com/v0/b/quanlynhahang-b44c4.appspot.com/o/images%2Fmeal-food.png?alt=media&token=f3f76cc9-c74d-4b08-9de9-b408e7745c42";


const TextFieldC = styled(TextField)`
  & .MuiInputBase-root {
    &.Mui-focused fieldset {
      border-color: #fff;
    }

    & fieldset {
      border-color: #fff;
    }
  }

  & .MuiInputLabel-root {
    &.Mui-focused {
      color: #fff;
    }
  }
`;

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
  const [LoaiThucAn, setLoaiThucAn] = useState();
  const [id, setId] = useState();
  const [file, setFile] = useState();
  const [onSubmit, setOnSubmit] = useState(false);

  const service = useDishService();
  const alert = useAlertService();

  useEffect(() => {
    if (open === false) {
      if (dish && dish.data) {
        const data = dish.data;
        setName(data.TenThucAn);
        setImgSrc(data.ImgSrc);
        setPrice(data.Gia);
        setSelected(data.Enable);
        setDescription(data.GioiThieu);
        setLoaiThucAn(data.LoaiThucAn);
      } else if (add) {
        setName("");
        setImgSrc("");
        setPrice(0);
        setSelected(true);
        setDescription("");
        setLoaiThucAn("");
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
      setLoaiThucAn(data.LoaiThucAn);
    }
  }, [dish]);

  const onUpdate = () => {
    if (onSubmit) return;
    try {
      if (dish && dish.data) {
        setOnSubmit(true);
        if (ImgSrc !== dish.data.ImgSrc) {
          service.uploadImg(file).then((res) => {
            const after = {
              TenThucAn: TenThucAn,
              ImgSrc: res,
              Gia: Number(Gia),
              Enable: Enable,
              GioiThieu: GioiThieu,
              LoaiThucAn: LoaiThucAn,
            };
            const newDish = { ...dish.data, ...after };
            service.updateThucAn(id, newDish).then((_) => setOnSubmit(false));
          });
        } else {
          const after = {
            TenThucAn: TenThucAn,
            Gia: Number(Gia),
            Enable: Enable,
            GioiThieu: GioiThieu,
            LoaiThucAn: LoaiThucAn,
          };
          const newDish = { ...dish.data, ...after };
          service.updateThucAn(id, newDish).then((_) => setOnSubmit(false));
        }
        alert.setAlert({
          type: "success",
          body: "Cập nhất thông tin món ăn thành công",
        });
        alert.showAlert(3000);
      }
    } catch (e) {
      alert.setAlert({
        type: "error",
        body: `Có lỗi xảy ra ${e.message}`,
      });
      alert.showAlert(3000);
    }

    onClose();
  };

  const onAdd = () => {
    if (onSubmit) return;
    try {
      setOnSubmit(true);
      if (ImgSrc !== "") {
        service.uploadImg(file).then((res) => {
          const newDish = {
            Rating: 0,
            TenThucAn: TenThucAn,
            ImgSrc: res,
            Gia: Number(Gia),
            Enable: Enable,
            GioiThieu: GioiThieu,
            LoaiThucAn: LoaiThucAn,
          };
          service.addThucAn(newDish).then((_) => setOnSubmit(false));
        });
      } else {
        const newDish = {
          TenThucAn: TenThucAn,
          Rating: 0,
          ImgSrc: srcDefault,
          Gia: Number(Gia),
          Enable: Enable,
          GioiThieu: GioiThieu,
          LoaiThucAn: LoaiThucAn,
        };
        service.addThucAn(newDish).then((_) => setOnSubmit(false));
      }

      alert.setAlert({
        type: "success",
        body: "Thêm món ăn thành công",
      });
      alert.showAlert(3000);
    } catch (e) {
      alert.setAlert({
        type: "error",
        body: `Có lỗi xảy ra ${e.message}`,
      });
      alert.showAlert(3000);
    }
    onClose();
  };

  const onSelectStateChange = (e) => {
    setSelected(e.target.value);
  };

  const onSelectDanhMucChange = (e) => {
    setLoaiThucAn(e.target.value);
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
        <DialogTitle sx={{ pb: "0px" }}>
          <Box>
            <Typography
              textAlign="center"
              variant="h5"
              gutterBottom
              component="div"
            >
              Chi tiết món ăn
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextFieldC
              variant="outlined"
              value={TenThucAn}
              fullWidth
              label="Tên món ăn"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextFieldC
              variant="outlined"
              type="number"
              value={Gia}
              fullWidth
              label="Giá"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <TextFieldC
              variant="outlined"
              select
              value={Enable}
              onChange={onSelectStateChange}
              fullWidth
              label="Trạng thái"
            >
              <MenuItem value={true}>Kinh doanh</MenuItem>
              <MenuItem value={false}>Tạm dừng</MenuItem>
            </TextFieldC>
            <TextFieldC
              variant="outlined"
              select
              value={LoaiThucAn}
              onChange={onSelectDanhMucChange}
              fullWidth
              label="Loại thức ăn"
            >
              {danhmuc.map((e, i) => (
                <MenuItem
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255,255,255,0.3)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.5)",
                      },
                    },
                  }}
                  key={i}
                  value={e}
                >
                  {e}
                </MenuItem>
              ))}
            </TextFieldC>
            <TextFieldC
              variant="outlined"
              fullWidth
              value={GioiThieu}
              multiline
              rows={3}
              label="Giới thiệu"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.6)" },
            }}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.6)" },
            }}
            onClick={() => (update ? onUpdate() : onAdd())}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default DishDetail;

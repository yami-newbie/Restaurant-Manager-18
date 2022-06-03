import {
  AppBar,
  Button,
  Card,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListDishOrder from "./ListDishOrder";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { formatter } from "../../services/uilts/formatPrice";
import { useCT_OrderService } from "../../services/ct_hoadon.service";
import { useOrderService } from "../../services/hoadon.service";

function OrderDetail({
  open = false,
  onClose = null,
  order,
  onCancel
}) {
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [listDish, setListDish] = useState([]);
  const [orderId, setOrderId] = useState();
  const [nameStaff, setNameStaff] = useState();
  const [state, setState] = useState();
  const [total, setTotal] = useState();

  const ct_dataService = useCT_OrderService();
  const order_dataService = useOrderService();

  useEffect(() => {
    if(order){
      setListDish(ct_dataService.getCT_HoaDonByIdHoaDon(order.id));
      const data = order.data;
      setName(data.TenKhachHang);
      setState(data.ThanhToan);
      setPhoneNumber(data.SoDienThoai);
      setNameStaff(data.NhanVien);
      setTotal(data.TongTien);
      setOrderId(order.id);
    }
  }, [ct_dataService, order])

  useEffect(() => {
    if(listDish) {
      var _total = 0;
      // console.log(listDish);
      listDish.map(dish => _total += dish.data.Gia * dish.data.SoLuong)
      setTotal(_total);
    }
  }, [listDish])

  const Save = () => {
    if(order){
      order_dataService.updateHoaDon(order.id, {
        ...order.data,
        TenKhachHang: name,
        SoDienThoai: phoneNumber,
      })
    }
    onClose();
  }

  const onPayment = () => {
    if (order) {
      order_dataService.updateHoaDon(order.id, {
        ...order.data,
        TenKhachHang: name,
        SoDienThoai: phoneNumber,
        ThanhToan: true,
      });
    }
    onClose();
  };

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 20, backgroundColor: "#f0f2f5" },
      }}
      fullScreen
      onClose={onClose}
      open={open}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chi tiết hóa đơn
          </Typography>
          <Button autoFocus color="inherit" onClick={Save}>
            lưu
          </Button>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={3}>
          <Grid item xs={4} sm={8} md={8}>
            <Box>
              <Card sx={{ padding: "20px", borderRadius: 5 }}>
                <Typography sx={{ mb: 1 }} variant="h5" component="div">
                  Danh sách món đã gọi
                </Typography>
                <ListDishOrder list={listDish} setList={setListDish} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Typography variant="h5" component="div">
                    Tổng tiền
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bolder !important",
                      paddingRight: "50px",
                    }}
                    variant="h5"
                    component="div"
                  >
                    {formatter.format(total)}
                  </Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={4}>
            <Stack spacing={3}>
              <Paper sx={{ borderRadius: 5 }}>
                <Box sx={{ padding: 3 }}>
                  <Typography sx={{ mb: 2 }} variant="h5" component="div">
                    Thông tin khách hàng
                  </Typography>
                  <Stack spacing={3}>
                    <TextField
                      label="Tên khách hàng"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <TextField
                      label="Số điện thoại"
                      value={phoneNumber}
                      fullWidth
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                    />
                  </Stack>
                </Box>
              </Paper>
              <Paper sx={{ borderRadius: 5 }}>
                <Box sx={{ padding: 3 }}>
                  <Typography sx={{ mb: 2 }} variant="h5" component="div">
                    Thông tin hoá đơn
                  </Typography>
                  <Stack spacing={3}>
                    <TextField label="Mã hóa đơn" value={orderId} />
                    <TextField
                      label="Tên nhân viên"
                      value={nameStaff}
                      fullWidth
                    />
                    <Stack direction="row" spacing={3}>
                      <Button onClick={onCancel} sx={{ width: "50%" }} variant="outlined">
                        Huỷ đơn
                      </Button>
                      <Button
                        onClick={onPayment}
                        disabled={state}
                        sx={{ width: "50%" }}
                        variant="contained"
                      >
                        Thanh toán
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default OrderDetail;

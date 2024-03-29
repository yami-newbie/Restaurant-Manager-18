import {
  AppBar,
  Button,
  Card,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
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
import { useTableService } from "../../services/ban.service";
import { useAlertService } from '../../services/alert.service'

const TextFieldC = styled(TextField)`
  & .MuiOutlinedInput-root {
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
  const [table, setTable] = useState();
  const [tables, setTables] = useState();

  const ct_dataService = useCT_OrderService();
  const order_dataService = useOrderService();
  const table_dataService = useTableService();
  const alert = useAlertService();

  useEffect(() => {
    const list = table_dataService.tablesEnable;
    if(list){
      setTables(list);
    }
  }, [table_dataService])

  useEffect(() => {
    if(order){
      setListDish(ct_dataService.getCT_HoaDonByIdHoaDon(order.id));
      const data = order.data;
      setName(data.TenKhachHang ? data.TenKhachHang : "");
      setState(data.ThanhToan ? data.ThanhToan : false);
      setPhoneNumber(data.SoDienThoai ? data.SoDienThoai : "");
      setNameStaff(data.NhanVien ? data.NhanVien : "");
      setTotal(data.TongTien ? data.TongTien : 0);
      setOrderId(order.id);
      setTable(data.TenBan ? data.TenBan : "");
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
        TenBan: table,
        TongTien: total
      }).then(() => {
        listDish.forEach((e, index) => ct_dataService.updateCT_HoaDon(e.id, e.data).then(() => {
          if(index === listDish.length - 1) {
            alert.setAlert({ type: "success", body: "Cập nhật thông tin hóa đơn thành công"});
            alert.showAlert();
          }
        }))
      })
    }
    onClose();
  }

  const tableChange = (event) => {
    setTable(event.target.value);
  };

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
        style: {
          backgroundSize: "cover",
          backgroundImage:
            "url(https://cdn.discordapp.com/attachments/945145709521432636/984530926375677952/unknown.png)",
        },
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
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={3}>
          <Grid item xs={4} sm={8} md={7}>
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
          <Grid item xs={4} sm={8} md={5}>
            <Stack spacing={3}>
              <Paper sx={{ borderRadius: 5 }}>
                <Box sx={{ padding: 3 }}>
                  <Typography sx={{ mb: 2 }} variant="h5" component="div">
                    Thông tin khách hàng
                  </Typography>
                  <Stack spacing={3}>
                    <TextFieldC
                      label="Tên khách hàng"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <TextFieldC
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
                    <TextFieldC label="Mã hóa đơn" value={orderId} />
                    <TextFieldC
                      select
                      onChange={tableChange}
                      value={table ? table : ""}
                      label="Bàn đã chọn"
                    >
                      {tables?.map((item, index) => (
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
                          key={index}
                          value={item.data.TenBan}
                        >
                          {item.data.TenBan}
                        </MenuItem>
                      ))}
                    </TextFieldC>

                    <TextFieldC
                      value={nameStaff}
                      fullWidth
                      label="Tên nhân viên"
                    />
                    <Stack direction="row" spacing={3}>
                      <Button
                        onClick={onCancel}
                        sx={{ width: "50%" }}
                        color="secondary"
                        variant="contained"
                      >
                        Huỷ đơn
                      </Button>
                      <Button
                        sx={{ width: "50%" }}
                        variant="contained"
                        color="secondary"
                        onClick={Save}
                      >
                        lưu
                      </Button>
                      <Button
                        onClick={onPayment}
                        disabled={state}
                        color="success"
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

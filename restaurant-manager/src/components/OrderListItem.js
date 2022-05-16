import { Button, Card, CardActionArea, CardActions, CardContent, Dialog, DialogActions, DialogTitle, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import OrderDetail from './OrderDetail';
import { formatter } from '../services/uilts/formatPrice';
import { Timestamp } from 'firebase/firestore';
import { useOrderService } from '../services/hoadon.service';
import { useCT_OrderService } from '../services/ct_hoadon.service';

const CardActionAreaCustom = styled(CardActionArea)({
  "&:hover": {
    color: "#FFF",
    backgroundColor: "rgba(28, 46, 80, 1)",
  },
});
const IconButtonCustom = styled(IconButton)({
  "&:hover": {
    color: "#FFF",
    backgroundColor: "rgba(28, 46, 80, 1)",
  },
});

function OrderListItem({order}) {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState();
  const [name, setName] = useState();
  const [time, setTime] = useState();
  const [total, setTotal] = useState();
  // const [confirmCancel, setConfirmCancel] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const order_dataService = useOrderService();
  const ct_order_dataService = useCT_OrderService();


  const openOrderDetail = () => {
    setOpen(true);
  }

  const closeOrderDetail = () => {
    setOpen(false);
  }

  const generalId = (id) => {
    return '# ' + String(id).substring(0, 10) + '...';
  }

  const onPayment = () => {
    if(order) {
      order_dataService.updateHoaDon(order.id,{
        ...order.data,
        ThanhToan: true,
      })
    }
  }

  const onCancel = () => {
    if(order) {
      ct_order_dataService.deleteCT_HoaDonByIdHoaDon(order.id);
      order_dataService.deleteHoaDon(order.id)
    }
  }

  useEffect(() => {
    if(order) {
      setOrderId(order.id);
      const data = order.data;
      setName(data.TenKhachHang);
      setTime(new Timestamp(data.ThoiGian.seconds, data.ThoiGian.nanoseconds).toDate().toLocaleString("vi"));
      setTotal(data.TongTien);
    }
  }, [order])

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "1.5rem",
        }}
      > 
        <CardActionAreaCustom onClick={openOrderDetail} sx={{ padding: 2 }}>
          <CardContent>
            <Typography
              sx={{ fontWeight: "bolder !important" }}
              variant="h6"
              component="div"
            >
              {generalId(orderId)}
            </Typography>
            <Typography>{name}</Typography>
            <Typography>{time}</Typography>
            <Typography sx={{ fontWeight: "bolder !important" }}>
              {formatter.format(total)}
            </Typography>
          </CardContent>
        </CardActionAreaCustom>

        <CardActions sx={{ m: 1 }}>
          <Stack spacing={2} direction="column">
            <Tooltip placement="right" title="Thanh toán">
              <IconButtonCustom onClick={onPayment} color="primary">
                <CreditScoreRoundedIcon />
              </IconButtonCustom>
            </Tooltip>
            <Tooltip placement="right" title="Hủy đơn">
              <IconButtonCustom
                onClick={() => setOpenConfirm(true)}
                color="primary"
              >
                <ClearRoundedIcon />
              </IconButtonCustom>
            </Tooltip>
          </Stack>
        </CardActions>
      </Card>
      <OrderDetail onCancel={() => {setOpenConfirm(true)}} order={order} open={open} onClose={closeOrderDetail} />

      <Dialog maxWidth="xs" fullWidth open={openConfirm}>
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bolder !important" }}
            component="div"
            textAlign="center"
          >
            Hủy đơn?
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Stack sx={{ width: "100%", m: 2 }} spacing={2} direction="row">
            <Button
              sx={{ width: "50%" }}
              variant="outlined"
              onClick={() => setOpenConfirm(false)}
            >
              Hủy
            </Button>
            <Button
              sx={{ width: "50%" }}
              variant="contained"
              onClick={() => {
                onCancel();
                setOpenConfirm(false);
                closeOrderDetail();
              }}
            >
              Xác nhận
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderListItem
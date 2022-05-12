import { Card, CardActionArea, CardActions, CardContent, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import OrderDetail from './OrderDetail';
import { formatter } from '../services/uilts/formatPrice';
import { Timestamp } from 'firebase/firestore';

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

  const openOrderDetail = () => {
    setOpen(true);
  }

  const closeOrderDetail = () => {
    setOpen(false);
  }

  const generalId = (id) => {
    return '# ' + String(id).substring(0, 10) + '...';
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
              <IconButtonCustom color="primary">
                <CreditScoreRoundedIcon />
              </IconButtonCustom>
            </Tooltip>
            <Tooltip placement="right" title="Hủy đơn">
              <IconButtonCustom color="primary">
                <ClearRoundedIcon />
              </IconButtonCustom>
            </Tooltip>
          </Stack>
        </CardActions>
      </Card>
      <OrderDetail order={order} open={open} onClose={closeOrderDetail} />
    </>
  );
}

export default OrderListItem
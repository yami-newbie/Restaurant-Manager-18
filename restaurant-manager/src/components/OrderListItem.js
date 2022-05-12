import { Card, CardActionArea, CardActions, CardContent, IconButton, Stack, styled, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import CreditScoreRoundedIcon from "@mui/icons-material/CreditScoreRounded";
import OrderDetail from './OrderDetail';

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

function OrderListItem() {
  const [open, setOpen] = useState(false);

  const openOrderDetail = () => {
    setOpen(true);
  }

  const closeOrderDetail = () => {
    setOpen(false);
  }

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
              variant="h5"
              component="div"
            >
              Order Id
            </Typography>
            <Typography>Tên khách hàng</Typography>
            <Typography>{Date()}</Typography>
            <Typography sx={{ fontWeight: "bolder !important" }}>
              Total
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
      <OrderDetail open={open} onClose={closeOrderDetail}/>
    </>
  );
}

export default OrderListItem
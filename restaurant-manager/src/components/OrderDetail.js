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
import React, { useState } from "react";
import ListDishOrder from "./ListDishOrder";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { formatter } from "../services/uilts/formatPrice";

function OrderDetail({
  open = false,
  onClose = null,
  listDish = [1, 1, 1, 1, 1],
}) {
  const [name, setName] = useState("Khách hàng A");
  const [phoneNumber, setPhoneNumber] = useState("Số điện thoại");

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
          <Button autoFocus color="inherit" onClick={onClose}>
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
                <ListDishOrder list={listDish} />
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
                    {formatter.format(2000000)}
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
                    <TextField label="Mã hóa đơn" value="FDFER7" />
                    <TextField
                      label="Tên nhân viên"
                      value="Nhân viên A"
                      fullWidth
                    />
                    <Stack direction="row" spacing={3}>
                      <Button sx={{ width: "50%" }} variant="outlined">
                        Huỷ
                      </Button>
                      <Button sx={{ width: "50%" }} variant="contained">
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

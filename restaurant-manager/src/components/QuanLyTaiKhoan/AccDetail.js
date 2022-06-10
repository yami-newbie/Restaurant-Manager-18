import {
  Avatar,
  Dialog,
  Typography,
  Grid,
  Box,
  DialogContent,
  IconButton,
  Stack,
  Button,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "../custom/Input";
import CloseIcon from "@mui/icons-material/Close";
import { Role } from "../../services/account.service";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AccDetail(props) {
  const { onClose, acc, open } = props;
  const [displayName, setDisplayName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (acc) {
      const data = acc.data;
      setAddress(data.address);
      setDisplayName(data.displayName);
      setPhotoURL(data.photoURL);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setRole(data.role)
    }
  }, [acc]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth={true}
      maxWidth={"sm"}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "15px",
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5">Thông tin tài khoản</Typography>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={photoURL}
            sx={{ width: "120px", height: "120px", m: 2 }}
          />
          <Typography
            sx={{
              fontWeight: "bold !important",
              fontSize: "20px",
              textAlign: "center",
            }}
            component="div"
          >
            {displayName}
          </Typography>
        </Box>
        <Stack sx={{ m: "8px" }} spacing={3} alignItems="center">
          <Grid container spacing={2}>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Địa chỉ"
                textAlign="start"
                width="90%"
                disabled={true}
                value={address}
              />
            </Grid>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Số điện thoại"
                type="phone"
                width="90%"
                textAlign="start"
                disabled={true}
                value={phoneNumber}
              />
            </Grid>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Chức vụ"
                width="90%"
                type="select"
                disabled={true}
                readOnly={true}
                items={["Quản lý", "Nhân viên"]}
                value={role === Role.admin ? "Quản lý" : "Nhân viên"}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                disabled={true}
                width="90%"
                text="Email"
                textAlign="start"
                readOnly={true}
                value={email}
              />
            </Grid>
          </Grid>
          <Button
            sx={{ width: "50%", borderRadius: "10px", height: "45px" }}
            variant="contained"
          >
            lưu
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default AccDetail;

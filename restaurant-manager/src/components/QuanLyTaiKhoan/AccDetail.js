import { DialogTitle, Paper } from '@material-ui/core';
import { Avatar, Dialog, Typography, Grid, Box  } from '@mui/material';
import { padding } from '@mui/system';
import React from 'react'
import Input from '../custom/Input';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function AccDetail(props) {
  const {onClose, acc, open} = props;

  const handleClose = () => {
    onClose();
  }
  
  
  return (
    <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={"sm"}>
      <div style={{width:'580px', height:'700px'}}>
        <DialogTitle>Thông tin tài khoản</DialogTitle>
        <div >
          <div style={{ display: "flex", flexDirection:'column', alignItems: "center", justifyContent:'center'}}>
          <Avatar

            sx={{ width: "140px", height: "140px", boxShadow: 5 }}
          />
            <div style={{marginTop:'10px'}}>
              <Typography variant="h4" component="div">
                {acc}
              </Typography>
              <Typography variant="h7" color={"#959595"} component="div">
                {acc}
              </Typography>
            </div>
          </div>
          <Grid container spacing={5} sx={{ mt: "0px" }}>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Tên"
                disabled={true}
                value={acc}
              />
            </Grid>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Địa chỉ"
                disabled={true}
                value={acc}
              />
            </Grid>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Số điện thoại"
                type="phone"
                disabled={true}
                value={acc}
              />
            </Grid>
            <Grid justifyContent="center" item xs={6}>
              <Input
                text="Chức vụ"
                disabled={true}
                readOnly={true}
                // value={auth.role === Role.admin ? "Quản lý" : "Nhân viên"}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                disabled={true}
                text="Email"
                readOnly={true}
                // value={auth.user.email}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Dialog>
  )
}

export default AccDetail
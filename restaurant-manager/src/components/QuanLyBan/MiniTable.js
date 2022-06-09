import { Card, Typography, Switch, MenuItem, ListItemIcon, ListItemText, Divider, MenuList, ListItemButton, IconButton, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Menu } from '@material-ui/core';
import TableDetail from './TableDetail';
import { useAlertService } from '../../services/alert.service';
import { useTableService } from '../../services/ban.serivce';

function MiniTable(props) {
  const {table, enable, onClick, onDelete} = props;
  const [enabled, setEnabled] = useState(enable);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const dataService = useTableService();
  const alert = useAlertService();

  const click = () => {
    setShow(true);
  }
  const back = () => {
    setShow(false);
  }
  const handleClick = () =>{
    onClick(table);
  }
  const handleDelete = () => {
    onDelete(table);
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClickClose = () => {
    setOpen(false);
  }
  
  return (
    <Card className='mini-table'>
      {(show)?(
        <div>
          <MenuList>
            <MenuItem onClick={handleClick}>
              <ListItemIcon>
                <DetailsIcon/>
              </ListItemIcon>
              <ListItemText primary="Chi tiết"/>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleClickOpen}>
              <ListItemIcon>
                <EditIcon/>
              </ListItemIcon>
              <ListItemText primary="Sửa"/>
            </MenuItem>
            <Divider/>
            <MenuItem onClick={back}>
              <ListItemIcon>
                <ArrowBackIosIcon/>
              </ListItemIcon>
              <ListItemText primary="Trở lại"/>
            </MenuItem>
            <Divider/>
          </MenuList>
          <TableDetail
            open={open}
            add={false}
            table={table}
            onClose={handleClickClose}
          />
        </div>
        
      ):(
        <div 
          style={{width:'100%', height:'100%', padding:"10px", '&:hover':{cursor:'pointer'}}}
        >
          <Typography variant="h5">
            {table.data.TenBan}
          </Typography>
          <Typography variant="subtitle2" 
          sx={{paddingTop:'20px' }}>
              {table.count} lượt đặt
          </Typography>
          <div className='button-group'>
            <IconButton onClick={handleClick}>
              <DetailsIcon/>  
            </IconButton>
            <IconButton onClick={handleClickOpen}>
              <EditIcon/>
            </IconButton>
            <IconButton 
              onClick={() => {
                if (table && table.data) {
                  setOpenConfirm(true);
                }
              }}>
              <DeleteIcon/>
            </IconButton>
          </div>
          <TableDetail
            open={open}
            add={false}
            table={table}
            onClose={handleClickClose}
          />
          <Dialog
            open={openConfirm}
            onClose={() => {
              setOpenConfirm(false);
            }}
          >
            <DialogTitle sx={{ bgcolor: "rgba(28, 46, 80, 1)", color: "#FFF" }}>
              <Typography variant="h5" component="div">
                Xác nhận xóa bàn
              </Typography>
            </DialogTitle>
            <DialogContent sx={{ m: 2 }}>
              <Typography variant="h6" component="div">
                Bạn có xác nhận xóa bàn này không?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setOpenConfirm(false);
                }}
                variant="outlined"
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  setOpenConfirm(false);
                  try {
                    dataService.deleteBan(table.id);
                    alert.setAlert({
                      type: 'success',
                      body: "Xóa bàn thành công"
                    })
                  }
                  catch (e) {
                    alert.setAlert({
                      type: "error",
                      body: `Có lỗi xảy ra, xóa thất bại`
                    })
                    console.log(e);
                  }

                  alert.showAlert();
                }}
                variant="contained"
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Card>
  )
}

export default MiniTable
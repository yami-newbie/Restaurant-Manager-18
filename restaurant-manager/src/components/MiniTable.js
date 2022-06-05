import { Card, Typography, Switch, MenuItem, ListItemIcon, ListItemText, Divider, MenuList, ListItemButton } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Menu } from '@material-ui/core';

function MiniTable(props) {
  const {id, booking, enable, onClick, onDelete} = props;
  const [enabled, setEnabled] = useState(enable);
  const [show, setShow] = useState(false);
  const click = () => {
    setShow(true);
  }
  const back = () => {
    setShow(false);
  }
  const handleClick = () =>{
    onClick(id);
  }
  const handleDelete = () => {
    onDelete(id);
  }
  return (
    <Card className='mini-table'>
      {(show)?(
        <div>
          <MenuList>
            <MenuItem disablePadding onClick={handleClick}>
              <ListItemIcon>
                <DetailsIcon/>
              </ListItemIcon>
              <ListItemText primary="Chi tiết"/>
            </MenuItem>
            <Divider/>
            <MenuItem disablePadding>
              <ListItemIcon>
                <EditIcon/>
              </ListItemIcon>
              <ListItemText primary="Sửa"/>
            </MenuItem>
            <Divider/>
            <MenuItem disablePadding onClick={back}>
              <ListItemIcon>
                <ArrowBackIosIcon/>
              </ListItemIcon>
              <ListItemText primary="Trở lại"/>
            </MenuItem>
            <Divider/>
          </MenuList>
        </div>
      ):(
        <div 
          onClick={click}
          style={{width:'100%', height:'100%', padding:"10px", '&:hover':{cursor:'pointer'}}}
        >
          <Typography variant="h5">
            {id}
          </Typography>
          <Typography variant="subtitle2" 
          sx={{paddingTop:'20px' }}>
              {booking} lượt đặt
          </Typography>
        </div>
      )}
    </Card>
  )
}

export default MiniTable
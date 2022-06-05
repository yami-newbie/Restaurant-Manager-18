import { Card, Typography, Switch, ListItem, ListItemIcon, ListItemText, Divider, List, ListItemButton } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <DetailsIcon/>
                </ListItemIcon>
                <ListItemText primary="Chi tiết"/>
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EditIcon/>
                </ListItemIcon>
                <ListItemText primary="Sửa"/>
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding>
              <ListItemButton onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon/>
                </ListItemIcon>
                <ListItemText primary="Xóa"/>
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem disablePadding>
              <ListItemButton onClick={back}>
                <ListItemIcon>
                  <ArrowBackIosIcon/>
                </ListItemIcon>
                <ListItemText primary="Trở lại"/>
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      ):(
        <div 
          onClick={click}
          style={{width:'100%', height:'100%', '&:hover':{cursor:'pointer'}}}
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
import { Card, Typography, Switch } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function MiniTable(props) {
  const {id, booking, enable, onClick} = props;
  const [enabled, setEnabled] = useState(enable);
  const handleClick = () =>{
    onClick(id);
  }
  return (
    <Card className='mini-table'>
        <Typography variant="h5">
            {id}
        </Typography>
        <Typography variant="subtitle2" 
        sx={{paddingTop:'20px', '&:hover':{textDecoration:'underline', cursor:'pointer'}}} onClick={handleClick}>
            {booking} lượt đặt
        </Typography>
        <div className='icon-list'>
            <DeleteIcon sx={{paddingBottom: '5px'}}/>
            <EditIcon sx={{paddingBottom: '5px'}}/>
            <Switch
                checked={enabled}
                
            />
        </div>
    </Card>
  )
}

export default MiniTable
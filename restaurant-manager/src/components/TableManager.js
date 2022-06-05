import { Button, Card, Table, TableBody, TableCell, TextField, TableContainer, TableHead, TableRow, MenuItem, Select, InputLabel, FormControl, Divider, Grid, Typography} from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import MiniTable from './MiniTable';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function TableManager() {
  const [tableList, setTableList] = React.useState([1,2,3,4,5,6,7]);
  const [show, setShow] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [value, setValue] = React.useState(new Date());
  const [timeList, setTimeList] = React.useState([1,2]);
  const [timeSelected, setTimeSelected] = React.useState();
  
  var tl = tableList;
  const handleClose = () => {
    setShow(false);
    setShowDetail(false);
  };
  const handleShowDetail = (time) => {
    setShowDetail(true);
    setTimeSelected(time);
  };
  const handleCloseDetail = () => {
    setShowDetail(false);
  }
  const handleSelect = (id) =>{
    setShow(true);
    setSelected(id);
    setShowDetail(false);
  }
  const handleDelete = (id) => {
    for (var i=0; i < tl.length; i++)
    {
      if (tl[i]===id)
      {
        tl.splice(i, 1);
        i--;
      }
    }
    console.log(tl.toString());
    setTableList(tl);
  }
  return (
    <div className='table-manager'>
      <div className='left-panel'>
        <div className='table-list'>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Grid container spacing = {2} className='tables'>
            {tableList.map((table) => (
              <Grid item>
                <MiniTable id={table} booking={1} enable={true} onClick={handleSelect} onDelete={handleDelete}/>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      {(show)?(
        <div className='right-panel'>
          <Card>
            <div className='time-detail'>
              <div className='closebutton'>
                <Typography variant='subtitle1'>{selected}</Typography>
                <CloseIcon onClick={handleClose}/>
              </div>
              <div className='time-group'>
                <Grid container spacing = {1} className='tables'>
                  {timeList.map((time)=>(
                    <Grid item>
                      <Button variant="outlined" onClick={()=>handleShowDetail(time)}>{time}</Button>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            {(showDetail)? (
              <div>
                <Divider/>
                <div className='food-detail'>
                  <div className='closebutton'>
                    <Typography variant='subtitle1'>{timeSelected}</Typography>
                    <KeyboardArrowUpIcon onClick={handleCloseDetail}/>
                  </div>
                </div>
              </div>
            ):null}
          </Card>
        </div>
      ):null}
    </div>
  );
}

export default TableManager
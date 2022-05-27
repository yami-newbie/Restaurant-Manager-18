import { Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, InputLabel, FormControl, Divider} from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { PickersDay } from '@mui/x-date-pickers';

function TableManager() {
  const [tableList, setTableList] = React.useState([1,2,3,4,5,6]);
  const [selected, setSelected] = React.useState(false);
  const [day, setDay] = React.useState(1);
  const [days, setDays] = React.useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
  const [month, setMonth] = React.useState(1);
  const [year, setYear] = React.useState(2022);
  
  let months = [];
  for (let i=1;i<13;i++)
  {
    months.push(i);
  }
  let ngays = [];
  const handleClick = () => {
    setSelected(true);
  };
  const handleClose = () => {
    setSelected(false);
  };
  const dayChange = (event) => {
    setDay(event.target.value);
  };
  const monthChange = (event) => {
    setMonth(event.target.value);
    let m = event.target.value;
    if(m === 1||m === 3||m === 5||m === 7||m === 8||m === 10||m === 12)
    {
      ngays = [];
      for (let i = 1; i<32; i++)
      {
        ngays.push(i);
      }
    }
    else if (m !== 2)
    {
      ngays=[];
      for (let i = 1; i<31; i++)
      {
        ngays.push(i);
      }
    }
    else 
    {
      ngays = [];
      for (let i = 1; i<29; i++)
      {
        ngays.push(i);
      }
    }
    setDays(ngays);
  };
  const yearChange = (event) => {
    setYear(event.target.value);
  };
  return (
    (selected)?
    (
      <div className='table-manager'>
        <div className='table-view'>
          <Card className='table-table'>
            <div className='day-select'>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id = "day-label">Ngày</InputLabel>
                <Select
                  labelID="day-lable"
                  value = {day}
                  label="Ngày"
                  onChange = {dayChange}
                >
                  {days.map(d=><MenuItem value = {d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id = "month-label">Tháng</InputLabel>
                <Select
                  labelId='month-label'
                  value={month}
                  label="Tháng"
                  onChange={monthChange}
                >
                  {months.map(m=><MenuItem value = {m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id = "year-label">Năm</InputLabel>
                <Select
                  labelId='year-label'
                  value = {year}
                  label = "Năm"
                  onChange={yearChange}
                >
                  <MenuItem value = {2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Divider/>
            <TableContainer>
              <Table sx={{mindWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{width:'100px'}}>ID Bàn</TableCell>
                    <TableCell>Timeline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableList.map((table)=>(
                    <TableRow 
                      hover
                      role="checkbox"
                      sx = {{'&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell component="th" scope="row" sx={{width:'100px'}}>
                        {table}
                      </TableCell>
                      <TableCell>
                        <Button>{table}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <Card className='food-detail'>
            <div  className='closebutton'>
              <CloseIcon onClick={handleClose}/>
            </div>
          </Card>
        </div>
      </div>
    ):(
      <div className='table-manager'>
        <div className='table-view'>
          <Card sx={{width: '100%'}}>
            <div className='day-select'>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id = "day-label">Ngày</InputLabel>
                <Select
                  labelID="day-lable"
                  value = {day}
                  label="Ngày"
                  onChange = {dayChange}
                >
                  {days.map(d=><MenuItem value = {d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id = "month-label">Tháng</InputLabel>
                <Select
                  labelId='month-label'
                  value={month}
                  label="Tháng"
                  onChange={monthChange}
                >
                  {months.map(m=><MenuItem value = {m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id = "year-label">Năm</InputLabel>
                <Select
                  labelId='year-label'
                  value = {year}
                  label = "Năm"
                  onChange={yearChange}
                >
                  <MenuItem value = {2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TableContainer>
              <Table sx={{mindWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{width:'100px'}}>ID Bàn</TableCell>
                    <TableCell>Timeline</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableList.map((table)=>(
                    <TableRow 
                      hover
                      role="checkbox"
                      sx = {{'&:last-child td, &:last-child th': { border: 0 }}}
                    >
                      <TableCell component="th" scope="row" sx={{width:'100px'}}>
                        {table}
                      </TableCell>
                      <TableCell>
                        <Button onClick={handleClick}>{table}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>
    )
  )
}

export default TableManager
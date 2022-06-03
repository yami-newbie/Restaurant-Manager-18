import React from 'react'
import Slider from '@mui/material/Slider';
import { Box, width } from '@mui/system';
import { MenuItem, Select, OutlinedInput, InputLabel, FormControl, Grid, Card, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LensTwoTone } from '@material-ui/icons';
import { Paper } from '@material-ui/core';
import { AddBox } from '@mui/icons-material';
import { useNavigate } from 'react-router';

function Table() {
  const [value, setValue] = React.useState([8, 10]);
  const [day, setDay] = React.useState(1);
  const [days, setDays] = React.useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
  const [month, setMonth] = React.useState(1);
  const [year, setYear] = React.useState(2022);
  const [tablestate, setTablestate] = React.useState([0,0,0,0,0,0]);
  const [selectedTable, setSelectedTable] = React.useState([]);

  let navigate = useNavigate();
  let selected = selectedTable;
  let tState = tablestate;
  let months = [];
  for (let i=1;i<13;i++)
  {
    months.push(i);
  }
  const listMonths = months.map((month) =>
    <MenuItem value = {month}>{month}</MenuItem>
  );
  let ngays = [];
  const listDays = days.map((day) =>
    <MenuItem value = {day}>{day}</MenuItem>
  )
  let tables= [];
  for (let i=1;i<7;i++)
  {
    tables.push(i);
  }
  const listTables = tables.map((table) => (
    (tablestate[table-1] === 0) ? (
      <Grid item xs={4}>
        <Box
          sx={{
            width: 100,
            height: 100,
            backgroundColor: 'white',
            '&:hover':{
              backgroundColor: '#dce1e8',
              opacity: [0.9, 0.8, 0.7],
            }
          }}
          onClick={()=>{
            tState[table-1] = 1;
            setTablestate(tState);
          }}
        >
          {table}
        </Box>
      </Grid>
    
  ) : (
    <Grid item xs={4}>
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          '&:hover':{
            backgroundColor: '#dce1e8',
            opacity: [0.9, 0.8, 0.7],
          }
        }}
        onClick={()=>{
          tState[table-1] = 0;
          setTablestate(tState);
        }}
      >
        {table}
      </Box>
    </Grid>
  )));
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const tableStateChange = (event, index) => {
    
  };
  return (
    <div className='table'>
      <div className='time-picker'>
        <div>
          <div className='time-slider'>
            <Slider
              getAriaLabel={() => 'Time range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              step={1}
              marks 
              min={8}
              max={20} 
            />
          </div>
          <div className='date-select'>
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
        </div>
      </div>
      <div className='table-select'>
        <div>
          <Grid container >
            {tablestate.map((table, index) => (
              <Grid item xs={4}>
                {
                  (table === 0) ? (
                    <Box
                      key = {index}
                      sx={{
                        width: 100,
                        height: 80,
                        paddingLeft: '5px',
                        paddingTop: '5px',
                        backgroundColor: 'white',
                        '&:hover':{
                          backgroundColor: '#dce1e8',
                          opacity: [0.9, 0.8, 0.7],
                        }
                      }}
                      onClick={()=>{
                        tState[index] = 1;
                        setTablestate(tState);
                        selected = [...selected, index];
                        setSelectedTable(selected);
                      }}
                    >
                      {index}
                    </Box>
                ) : (
                    <Box
                      key = {index}
                      sx={{
                        width: 100,
                        height: 80,
                        paddingLeft: '5px',
                        paddingTop: '5px',
                        backgroundColor: 'red',
                        '&:hover':{
                          backgroundColor: '#f54242',
                          opacity: [0.9, 0.8, 0.7],
                        }
                      }}
                      onClick={()=>{
                        tState[index] = 0;
                        setTablestate(tState);
                        let valueToRemove = index;
                        selected = selected.filter(item => item !== valueToRemove);
                        setSelectedTable(selected);
                      }}
                    >
                      {index}
                    </Box>
                  )
                }
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <div className='button-group'>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={()=>{navigate("/");}}>Trở lại</Button>
          <Button variant="contained">Xác nhận</Button>
        </Stack>
      </div>
    </div>
  )
}

export default Table
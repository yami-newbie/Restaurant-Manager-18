import React, { useState } from 'react'
import { Button, Grid, Slider, Stack, TextField, Typography, Link, Card } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Table2 from '../components/TableIcon/Table2';
import Table4 from '../components/TableIcon/Table4';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function BookTable() {
    const [tableid, setTableid] = useState([1,2,3,4,5,6]);
    const [tabletype, setTabletype] = useState([1,1,1,2,2,2]);
    const [time, setTime] = React.useState([10, 12]);
    const [value, setValue] = React.useState(new Date());
    const [selected, setSelected] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    let select = selected;
    const handleChange = (event, newValue) => {
        setTime(newValue);
      };
    const handleSelect = (id) => {
        select = [...select, id];
        setSelected(select);
    }
    const handleCancel = (id) => {
        for (var i=0; i<select.length;i++)
        {
            if (select[i] === id)
            {
                select.splice(i, 1);
            }
        }
        setSelected(select);
        forceUpdate();
    }

    const draw = (type, id) => {
        switch(type)
        {
            case 1: return <Table2 id={id} status={0} onClick={handleSelect} onCancel={handleCancel}/>;
            case 2: return <Table4 id={id} status={0} onClick={handleSelect} onCancel={handleCancel}/>;
            default: return null;
        }
    }
    
  return (
    <div className='table'>
        <div className='time-picker'>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='time-slider'>
                <Slider
                    getAriaLabel={() => 'Time range'}
                    value={time}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    step={1}
                    marks 
                    min={8}
                    max={20} 
                />
            </div>
        </div>
        <div className='table-icon'>
            <Card className='border'>
                <div className='dt'>
                    <div>
                        <Grid container spacing={5}> 
                            {tabletype.map((type, index) => 
                                    <Grid item>
                                        <div>
                                            {draw(type, index+1)}
                                        </div>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div>
                            <Typography variant='subtitle2'>Bàn đang chọn:</Typography>
                        </div>
                        <div>
                            {selected}
                        </div>
                    </div>
                    
                </div>
            </Card>
        </div>
        <div className='button-list'>
            <Stack spacing={2} direction="row">
                <Button variant="outlined">Trở lại</Button>
                <Button variant="contained">Xác nhận</Button>
                <Link href="#" underline="hover" sx={{marginTop:'5px'}}>
                    {'Bỏ qua'}
                </Link>
            </Stack>
        </div>
    </div>
  )
}

export default BookTable
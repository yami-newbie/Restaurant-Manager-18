import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, Slider, Stack, TextField, Typography, Link, Card } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Table2 from '../components/TableIcon/Table2';
import Table4 from '../components/TableIcon/Table4';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import BanDataService from '../services/ban.serivce';
import { CT_DatBanService } from '../services/ct_datban.service';

function BookTable() {
    const [tableid, setTableid] = useState([1,2,3,4,5,6]);
    const [tabletype, setTabletype] = useState([1,1,1,2,2,2]);
    const [tableList, setTableList] = useState([]);
    const [time, setTime] = React.useState([10, 12]);
    const [day, setDay] = React.useState(new Date());
    const [selected, setSelected] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const table = BanDataService();
    const datban = CT_DatBanService();
    useEffect(()=>{
        if(table.ban)
        {
        setTableList(table.ban);
        }
    },[table])
    const select = useRef(selected);
    const handleChange = (event, newValue) => {
        setTime(newValue);
      };
    const handleSelect = (id) => {
        select.current = [...select.current, id];
        setSelected(select.current);
    }
    const handleCancel = (id) => {
        for (var i=0; i<select.current.length;i++)
        {
            if (select.current[i] === id)
            {
                select.current.splice(i, 1);
            }
        }
        setSelected(select.current);
        forceUpdate();
    }
    const handleConfirm = () => {
        selected.map((sl)=>{
            datban.addCT_DatBan({id: sl, time: time, day: day});
        })
    }

    const draw = (type, name, id) => {
        switch(type)
        {
            case 1: return <Table2 name={name} status={0} onClick={handleSelect} onCancel={handleCancel} id={id}/>;
            case 2: return <Table4 name={name} status={0} onClick={handleSelect} onCancel={handleCancel} id={id}/>;
            default: return null;
        }
    }
    
  return (
    <div className='table'>
        <div className='time-picker'>
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    value={day}
                    onChange={(newValue) => {
                        setDay(newValue);
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
                            {tableList.map((table) => 
                                    <Grid item>
                                        <div>
                                            {draw(table.data.Loai, table.data.TenBan)}
                                        </div>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </div>
                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div>
                            <Typography variant='subtitle2'>{"Bàn đang chọn: " + selected}</Typography>
                        </div>
                    </div>
                    
                </div>
            </Card>
        </div>
        <div className='button-list'>
            <Stack spacing={2} direction="row">
                <Button variant="outlined">Trở lại</Button>
                <Button variant="contained" onClick={handleConfirm}>Xác nhận</Button>
                <Link href="#" underline="hover" sx={{marginTop:'5px'}}>
                    {'Bỏ qua'}
                </Link>
            </Stack>
        </div>
    </div>
  )
}

export default BookTable
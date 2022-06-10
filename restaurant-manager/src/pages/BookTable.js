import React, { useState, useEffect, useRef } from 'react'
import { Button, Grid, Slider, Stack, TextField, Typography, Link, Card } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Table2 from '../components/TableIcon/Table2';
import Table4 from '../components/TableIcon/Table4';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {useTableService} from '../services/ban.serivce';
import { CT_DatBanService } from '../services/ct_datban.service';
import { useCT_OrderService } from '../services/datban.service';

function BookTable() {
    const [tableList, setTableList] = useState([]);
    const [time, setTime] = React.useState([8, 8]);
    const [day, setDay] = React.useState(new Date());
    const [selected, setSelected] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [orders, setOrders] = useState([]);

    const table = useTableService();
    const datban = useCT_OrderService();
    const ct_datban = CT_DatBanService();

    useEffect(()=>{
        if(table.tables)
        {
            setTableList(table.tables);
            getAllOrderByDate(new Date().toLocaleDateString());
        }
    },[table])

    useEffect(()=>{
        const tl = tableList.map((table)=>{
            const value = getOrderPerTableByDay(table.data.TenBan);
            const kq = value?.map((v)=>{
                const timeline = v.data.time;
                if (time[0]>time[1])
                time.reverse();
                if(time[0] <= timeline[0] && timeline[0] < time[1])
                {
                    return 0;
                }
                if(time[0] < timeline[1] && timeline[1] <= time[1])
                {
                    return 0;
                }
            })
            if (kq?.filter(e=>typeof(e)!='undefined').length > 0) 
            {
                return ({
                    ...table, status: -1
                });
            }
            else
            {
                return({
                    ...table, status: 0
                })
            }
        })
        setTableList(tl);
    },[time])

    useEffect(()=>{
        if (day)
            getAllOrderByDate(day.toLocaleDateString());
    },[day])

    const getAllOrderByDate = (date) => {
        const orderID = datban.getDatBanByDate(date);
        if (orderID && orderID.length > 0) {
          ct_datban.getCT_DatBanByID_DB(orderID).then((res) => setOrders(res));
        } else {
          setOrders([]);
        }
    };

    const getOrderPerTableByDay = (id_Ban) => {
        if (orders) {
          const order = orders?.filter((e) => e.data.ID_Ban === id_Ban)
          if (order && order.length>0)
            return datban.getDatBanByID_DatBan(order);
        }
      }

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
        datban.addDatBan({time: time, day: day.toLocaleDateString()}).then((data)=>{
            selected.map((sl)=>{
                ct_datban.addCT_DatBan({ID_DatBan: data.id, ID_Ban: sl});
            })
        });
        
    }

    const draw = (type, name, status) => {
        switch(type)
        {
            case 1: return <Table2 name={name} status={status} onClick={handleSelect} onCancel={handleCancel} />;
            case 2: return <Table4 name={name} status={status} onClick={handleSelect} onCancel={handleCancel} />;
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
                                            {draw(table.data.Loai, table.data.TenBan, table.status)}
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
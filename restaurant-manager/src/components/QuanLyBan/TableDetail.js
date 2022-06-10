import { TextField } from '@material-ui/core';
import { Button, Dialog, DialogTitle, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect } from 'react'
import { useTableService } from '../../services/ban.service';
import { useAlertService } from "../../services/alert.service";

function TableDetail(props) {
    const {onClose, open, table, add, update} = props;
    const [type, setType] = React.useState(1)
    const [name, setName] = React.useState();
    const [status, setStatus] = React.useState(true);
    const [id, setID] = React.useState();

    const service = useTableService();
    const alert = useAlertService();

    useEffect(() => {
        if(open===false) {
            if(table && table.data) {
                const data = table.data;
                setName(data.TenBan);
                setType(data.Loai);
                setStatus(data.TrangThai);
            } else if (add)
            {
                setName("");
                setType("");
                setStatus(true);
            }
        }
    }, [open, table])

    useEffect(()=>{
        if(table && table.data)
        {
            const data = table.data;
            setID(table.id);
            setName(data.TenBan);
            setType(data.Loai);
            setStatus(data.TrangThai);
        }
    },[table])
    const onUpdate = () => {
        try {
            if (table && table.data)
            {
                const after = {
                    TenBan: name,
                    Loai: type,
                    TrangThai: status
                };
                const newTable = {...table.data, ...after};
                service.updateBan(id, newTable);
                alert.setAlert({
                    type: "success",
                    body: "Cập nhất thông tin bàn thành công",
                  });
                  alert.showAlert(3000);
            }
            
        }
        catch(e) {
            alert.setAlert({
              type: "error",
              body: `Có lỗi xảy ra ${e.message}`,
            });
            alert.showAlert(3000);
          }
          
          onClose();
    };
    const onAdd = () => {
        try {
            const newTable = {
                TenBan: name,
                Loai: type,
                TrangThai: status
            };
            service.addBan(newTable);
            alert.setAlert({
                type: 'success',
                body: "Thêm bàn thành công"
              })
              alert.showAlert(3000);
        } catch (e) {
            alert.setAlert({
              type: "error",
              body: `Có lỗi xảy ra ${e.message}`,
            });
            alert.showAlert(3000);
          }
          onClose();
    }
    const handleClose = () => {
        onClose();
    }

    const handleChange = (event) => {
        setType(event.target.value);
      };
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{(add)?("Thêm bàn"):("Sửa bàn")}</DialogTitle>
        <div className='add-dialog'>
            <div className='ban'>
                <TextField label="Tên bàn" variant="outlined" onChange={handleNameChange} value={name}></TextField>
            </div>
            <div className='ban'>
                <InputLabel id="select-label">Loại bàn</InputLabel>
                <Select
                    labelId="select-label"
                    id="type-select"
                    value={type}
                    label="Loại"
                    onChange={handleChange}
                    sx={{width:'225px'}}
                >
                    <MenuItem value={1}>2 người</MenuItem>
                    <MenuItem value={2}>4 người</MenuItem>
                </Select>
            </div>
            <div className='button'>
                <Button variant='contained' onClick={()=> (add ? onAdd() : onUpdate())}>Xác nhận</Button>
            </div>
        </div>
    </Dialog>
  )
}

export default TableDetail
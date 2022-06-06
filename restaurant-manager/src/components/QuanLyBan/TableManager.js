import {
  Button,
  Card,
  TextField,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MiniTable from "./MiniTable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTableService } from "../../services/ban.serivce";
import { CT_DatBanService } from "../../services/ct_datban.service";
import { useCT_OrderService } from "../../services/datban.service";
import { isFirstDayOfMonth } from "date-fns";

function TableManager() {
  const [tableList, setTableList] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);
  const [selected, setSelected] = React.useState();
  const [value, setValue] = React.useState(new Date());
  const [timeList, setTimeList] = React.useState([1, 2]);
  const [timeSelected, setTimeSelected] = React.useState();
  const [, updateState] = React.useState();
  const [orders, setOrders] = useState([]);

  const tables = useTableService();
  const ct_datban = CT_DatBanService();
  const datban = useCT_OrderService();

  const getOrderByDate = (date) => {
    const orderID = datban.getDatBanByDate(date);
    if (orderID && orderID.length > 0) {
      ct_datban.getCT_DatBanByID_DB(orderID).then((res) => setOrders(res));
    } else {
      setOrders([]);
    }
  };

  const getCount = (id) => {
    if (orders) return orders?.filter((e) => e.data.ID_Ban === id).length;
  };

  useEffect(() => {
    setTableList(
      tableList.map((e) => ({ ...e, count: getCount(e.data.TenBan) }))
    );
  }, [orders]);

  useEffect(() => {
    if (value) getOrderByDate(value.toLocaleDateString());
  }, [value]);

  useEffect(() => {
    if (tables && tables.tables.length > 0) {
      setTableList(tables.tables);
      getOrderByDate(new Date().toLocaleDateString());
    }
  }, [tables]);

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
  };
  const handleSelect = (id) => {
    setShow(true);
    setSelected(id);
    setShowDetail(false);
  };
  const handleDelete = (id) => {
    for (var i = 0; i < tl.length; i++) {
      if (tl[i] === id) {
        tl.splice(i, 1);
        i--;
      }
    }
    console.log(tl.toString());
    setTableList(tl);
    updateState({});
  };
  return (
    <div className="table-manager">
      <div className="left-panel">
        <div className="table-list">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Grid container spacing={2} className="tables">
            {tableList.map((table, i) => (
              <Grid item key={i}>
                <MiniTable
                  id={table.data.TenBan}
                  booking={table.count}
                  enable={true}
                  onClick={handleSelect}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      {show ? (
        <div className="right-panel">
          <Card>
            <div className="time-detail">
              <div className="closebutton">
                <Typography variant="subtitle1">{selected}</Typography>
                <CloseIcon
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#f7f7f7",
                    },
                  }}
                />
              </div>
              <div>
                <Typography variant="subtitle1">Loại bàn:</Typography>
              </div>
              <div className="time-group">
                <Grid container spacing={1} className="tables">
                  {timeList.map((time) => (
                    <Grid item>
                      <Button
                        variant="outlined"
                        onClick={() => handleShowDetail(time)}
                      >
                        {time}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            {showDetail ? (
              <div>
                <Divider />
                <div className="food-detail">
                  <div className="closebutton">
                    <Typography variant="subtitle1">{timeSelected}</Typography>
                    <KeyboardArrowUpIcon
                      onClick={handleCloseDetail}
                      sx={{
                        "&:hover": {
                          cursor: "pointer",
                          backgroundColor: "#f7f7f7",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default TableManager;

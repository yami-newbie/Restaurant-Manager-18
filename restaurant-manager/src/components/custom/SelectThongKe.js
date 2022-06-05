import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import React from "react";

function SelectThongKe(props) {
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const {
    monthSelect,
    MonthChange,
    OtpChange,
    yearSelect,
    yearChange,
    otp,
    dateSelect,
    dateChange,
    years,
  } = props;

  const SelectMonth = () => {
    return (
      <FormControl>
        <InputLabel>Tháng</InputLabel>
        <Select
          value={monthSelect}
          sx={{
            "& .MuiSelect-select": {
              minWidth: "50px",
            },
          }}
          onChange={MonthChange}
          label="Tháng"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {month.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const SelectYear = () => {
    return (
      <FormControl>
        <InputLabel>Năm</InputLabel>
        <Select
          value={yearSelect}
          sx={{
            "& .MuiSelect-select": {
              minWidth: "50px",
            },
          }}
          onChange={yearChange}
          label="Năm"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {years?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const SelectOtp = () => {
    return (
      <FormControl>
        <InputLabel>Chọn</InputLabel>
        <Select
          value={otp}
          onChange={OtpChange}
          label="Chọn"
          sx={{
            "& .MuiSelect-select": {
              minWidth: "100px",
            },
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"Theo ngày"}>Theo ngày</MenuItem>
          <MenuItem value={"Theo tháng"}>Theo tháng</MenuItem>
          <MenuItem value={"Theo năm"}>Theo năm</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ m: 2, display: "flex", justifyContent: "end" }}
      >
        {otp === "Theo tháng" ? (
          <>
            <SelectMonth />
            <SelectYear />
          </>
        ) : null}
        {otp === "Theo năm" ? <SelectYear /> : null}
        {otp === "Theo ngày" ? (
          <DesktopDatePicker
            label="Ngày"
            inputFormat="dd/MM/yyyy"
            value={dateSelect}
            onChange={dateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : null}
        <SelectOtp />
      </Stack>
    </LocalizationProvider>
  );
}

export default SelectThongKe;

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import React, { useEffect } from "react";

export const Option = {
  day: "Theo ngày",
  month: "Theo tháng",
  year: "Theo năm"
}

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
      <FormControl sx={{ color: "#000" }}>
        <InputLabel sx={{color: "#000"}} >Tháng</InputLabel>
        <Select
          value={monthSelect}
          sx={{
            "& .MuiSelect-select": {
              minWidth: "50px",
            },
            color: "#000",
          }}
          onChange={MonthChange}
          label="Tháng"
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {month.map((item, index) => (
            <MenuItem
              key={index} value={item}
            >
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
        <InputLabel sx={{ color: "#000" }}>Năm</InputLabel>
        <Select
          value={yearSelect}
          sx={{
            "& .MuiSelect-select": {
              minWidth: "50px",
            },
            color: "#000",
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
        <InputLabel sx={{ color: "#000" }}>Chọn</InputLabel>
        <Select
          value={otp}
          onChange={OtpChange}
          label="Chọn"
          sx={{
            "& .MuiSelect-select": {
              minWidth: "100px",
            },
            color: "#000",
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={Option.day}>Theo ngày</MenuItem>
          <MenuItem value={Option.month}>Theo tháng</MenuItem>
          <MenuItem value={Option.year}>Theo năm</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ display: "flex", justifyContent: "end" }}
      >
        {otp === Option.month ? (
          <>
            <SelectMonth />
            <SelectYear />
          </>
        ) : null}
        {otp === Option.year ? <SelectYear /> : null}
        {otp === Option.day ? (
          <DesktopDatePicker
            label="Ngày"
            inputFormat="dd/MM/yyyy"
            value={dateSelect}
            onChange={dateChange}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& .MuiInputBase-input": { color: "#000" },
                  "& .MuiInputBase-root": { "&:hover" : { borderColor: "#000"} },
                  "& .MuiInputLabel-root": { color: "#000" },
                }}
                {...params}
              />
            )}
          />
        ) : null}
        <SelectOtp />
      </Stack>
    </LocalizationProvider>
  );
}

export default SelectThongKe;

import {
  Box,
  Divider,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function SearchTextField(props) {
  const {
    search,
    onChange,
    haveRes,
    onClear,
    handleChange,
    filter = 10,
    filterList
  } = props;

  return (
    <Box>
      <Paper component="form" sx={{ m: 1, p: "2px 4px" }}>
        <Box sx={{ display: "flex" }}>
          <InputBase
            sx={{ ml: 1, flex: 1, width: "100%", pl: 1 }}
            placeholder="Tìm kiếm"
            value={search}
            onChange={onChange}
          />
          <Select value={filter} onChange={handleChange}>
            {filterList?.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
          </Select>
          <IconButton onClick={onClear} sx={{ p: "10px" }} aria-label="search">
            <CloseIcon />
          </IconButton>
        </Box>

        {!haveRes ? (
          <>
            <Divider />
            <Typography sx={{ fontSize: 14, pl: 2, mt: 1 }}>
              Không tìm thấy kết quả nào
            </Typography>
          </>
        ) : null}
      </Paper>
    </Box>
  );
}

export default SearchTextField;

import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";


const SelectC = styled(Select)`
  & .MuiSelect-select {
    padding: 5px 14px;
  }

  & .MuiInputBase {
    border-color: #fff;
  }
`;

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
      <Paper
        component="form"
        sx={{ m: 1, p: "2px 4px", backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <Box sx={{ display: "flex" }}>
          <InputBase
            sx={{ ml: 1, flex: 1, width: "100%", pl: 1 }}
            placeholder="Tìm kiếm"
            value={search}
            onChange={onChange}
          />
          <FormControl
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              margin: "5px 0px",
              borderRadius: "4px",
            }}
          >
            <SelectC value={filter} onChange={handleChange}>
              {filterList?.map((item, i) => (
                <MenuItem
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                    },
                  }}
                  key={i}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </SelectC>
          </FormControl>
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

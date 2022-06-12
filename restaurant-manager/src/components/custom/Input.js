import { Box, MenuItem, TextField } from '@mui/material';
import React from 'react'

const Input = (props) => {
  const {
    text,
    onChange,
    value,
    readOnly = false,
    type = "text",
    disabled,
    width = "70%",
    height = "45px",
    mt = 3,
    error = false,
    helperText,
    bold = false,
    hideLabel = false,
    textAlign = "center",
    items = [],
  } = props;

  return (
    <Box sx={{ justifyContent: "center", display: "flex" }}>
      <Box sx={{ width: width }}>
        {!hideLabel ? (
          <div
            style={{
              paddingLeft: 10,
              marginBottom: mt,
              fontWeight: bold ? "bold" : "none",
            }}
          >
            {text}
          </div>
        ) : null}
        <TextField
          value={value ? value : ""}
          label={hideLabel ? text : ""}
          onChange={onChange}
          readOnly={readOnly}
          type={type}
          select={type === "select" ? true : false}
          error={error}
          helperText={helperText}
          disabled={!disabled}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: "10px",
              height: height,
              color: "#000"
            },
            "& input": { textAlign: textAlign },
            width: "100%",
            "& .Mui-disabled": {
              "-webkit-text-fill-color": "#000",
            },
          }}
        >
          {items?.map((e, i) => (
            <MenuItem key={i} value={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};

export default Input
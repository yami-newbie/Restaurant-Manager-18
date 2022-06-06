import React, { useState } from 'react'
import { Stack, Box } from '@mui/material'

function Table4(props) {
  const{name, status, onClick, onCancel} = props;
  const[type, setType] = useState(status);
  const check = () => {
    setType(1);
    onClick(name);
  }
  const uncheck = () => {
    setType(0);
    onCancel(name);
  }
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{marginLeft:'5px', marginBottom:'5px'}}>
        <Box className="half-circle">
        </Box>
        <Box className="half-circle">
        </Box>
      </Stack>
      {
        (type===-1)?(
          <Box className="full-table" sx={{backgroundColor:'red', cursor:'default'}}>
            {name}
          </Box>
        ):(
          (type===1)?(
            <Box className="full-table" sx={{backgroundColor:'green'}} onClick={uncheck}>
              {name}
            </Box>
          ):(
            <Box className="full-table" onClick={check}>
              {name}
            </Box>
          )
        )
      }
      <Stack spacing={1} direction="row" sx={{marginLeft:'5px', marginTop:'5px'}}>
        <Box className="half-circle-rev">
        </Box>
        <Box className="half-circle-rev">
        </Box>
      </Stack>
    </div>
  )
}

export default Table4
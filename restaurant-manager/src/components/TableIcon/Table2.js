import { Box } from '@mui/system'
import React from 'react'

function Table2(props) {
  const{id, status, onClick, onCancel} = props;
  const[type, setType] = React.useState(status);
  const check = () => {
    setType(1);
    onClick(id);
  }
  const uncheck = () => {
    setType(0);
    onCancel(id);
  }
  return (
    <div>
      <div style={{marginLeft:'5px', marginBottom:'5px'}}>
        <Box className="half-circle">
        </Box>
      </div>
      {
        (type===-1)?(
          <Box className="half-table" sx={{backgroundColor:'red', cursor:'default'}}>
            {id}
          </Box>
        ):(
          (type===1)?(
            <Box className="half-table" sx={{backgroundColor:'green'}} onClick={uncheck}>
              {id}
            </Box>
          ):(
            <Box className="half-table" onClick={check}>
              {id}
            </Box>
          )

        )
      }
      <div style={{marginLeft:'5px', marginTop:'5px'}}>
        <Box className="half-circle-rev">
        </Box>
      </div>
    </div>
    
  )
}

export default Table2
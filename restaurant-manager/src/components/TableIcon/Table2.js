import { Box } from '@mui/system'
import React from 'react'

function Table2(props) {
  const{name, status, onClick, onCancel, id} = props;
  const[type, setType] = React.useState(status);
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
      <div style={{marginLeft:'5px', marginBottom:'5px'}}>
        <Box className="half-circle">
        </Box>
      </div>
      {
        (type===-1)?(
          <Box className="half-table" sx={{backgroundColor:'red', cursor:'default'}}>
            {name}
          </Box>
        ):(
          (type===1)?(
            <Box className="half-table" sx={{backgroundColor:'green'}} onClick={uncheck}>
              {name}
            </Box>
          ):(
            <Box className="half-table" onClick={check}>
              {name}
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
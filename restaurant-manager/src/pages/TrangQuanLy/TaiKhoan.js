import { Card, Grid } from '@material-ui/core'
import React from 'react'
import AccPreview from '../../components/QuanLyTaiKhoan/AccPreview'

function TaiKhoan() {
  const [accList, setAccList]=React.useState([1,2,3,4,5,6])  
  
  return (
    <div style={{padding:'20px'}}>
      <Grid container spacing={2}>
        {accList.map((acc)=>(
          <Grid item>
            <AccPreview acc={acc}/>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default TaiKhoan
import { Typography } from '@material-ui/core'
import React from 'react'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

function AppFooter() {
  return (
    <div className='app-footer'>
        <div className='about'>
            <Typography>
                Contact us:
            </Typography>
            
            <Typography>
                Phone
            </Typography>
            
            <Typography>
                Email
            </Typography>

            <Typography>
                Address:
            </Typography>
            
        </div>
            <Typography>
                Quick access:
            </Typography>
        <div>

        </div>
    </div>
  )
}

export default AppFooter
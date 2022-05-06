import { Divider, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function AppFooter() {
  return (
    <div className='app-footer'>
        <div className='app-footer-detail'>
            <div className='item'>
                <Typography>
                    Contact us:
                </Typography>
                <div className='detail'>
                    <Typography>
                        Phone: 0369346897
                    </Typography>
                    
                    <Typography>
                        Email: khanhtoannguyen12@gmail.com
                    </Typography>

                    <Typography>
                        Address: Khu phố 6, phường Linh Trung, quận Thủ Đức, tp. Hồ Chí Minh
                    </Typography>
                </div>

            </div>
            
            <div>
                <Typography>
                    Quick access:
                </Typography>
            </div>
        </div>
        <div style={{width: "80%", marginLeft: "auto", marginRight: "auto"}}>
            <Divider/>
        </div>
        
        <div className='link'>
            <div>
                <IconButton href="https://www.facebook.com/khanhtoan.nguyen.568847" target="_blank" rel="noreferrer noopener">
                    <FacebookIcon/>
                </IconButton>
            </div>
            <div>
                <IconButton href="https://twitter.com/NguynKh25518617" target="_blank" rel="noreferrer noopener">
                    <TwitterIcon/>
                </IconButton>
            </div>
            <div>
                <IconButton>
                    <InstagramIcon/>
                </IconButton>
            </div>
        </div>
    </div>
    
  )
}

export default AppFooter
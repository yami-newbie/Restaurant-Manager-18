import { Avatar, Box } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Button, Stack } from '@mui/material'
import React from 'react'

function AppHeaderLg() {
  return (
    <div className = 'app-header'>
      <Box className= "app-icon" sx = {{bgcolor: red}}>
      </Box>
      <Stack direction="row" spacing={2} className = 'app-item'>
        <Button variant="text">Text</Button>
        <Button variant="text">Text</Button>
        <Button variant="text">Text</Button>
        <Avatar>H</Avatar>
      </Stack>
    </div>
  )
}

export default AppHeaderLg
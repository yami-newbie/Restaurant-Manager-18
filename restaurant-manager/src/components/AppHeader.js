import { Box } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Button, Stack } from '@mui/material'
import React from 'react'

function AppHeader() {
  return (
    <div className = 'app-header'>
      <Box className= "app-icon" sx = {{bgcolor: red}}>
      </Box>
      <Stack direction="row" spacing={2} className = 'app-item'>
        <Button variant="text">Text</Button>
        <Button variant="text">Text</Button>
        <Button variant="text">Text</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="contained">Contained</Button>
      </Stack>
    </div>
  )
}

export default AppHeader
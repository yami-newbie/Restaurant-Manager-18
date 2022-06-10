import { Skeleton, Stack } from '@mui/material';
import React from 'react'

function DoanhThu() {
  return (
    <div>
      <Stack spacing={1}>
        <Skeleton variant="text" />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Stack>
    </div>
  );
}

export default DoanhThu;
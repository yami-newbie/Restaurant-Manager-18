import { Avatar, Card, CardContent, Typography } from '@mui/material';
import React from 'react'

function AppSetting({
  Account = {
    avatarSrc: "/avatar/94702183_p0.jpg",
    name: "hoang anh",
    soDienThoai: "0943993238",
    email: "hoanganh18346@gmail.com",
  },
}) {
  return (
    <Card sx={{ display: "flex" }}>
      <Avatar src={Account.avatarSrc} sx={{ width: 100, height: 100, m: 2 }} />
      <CardContent>
        <Typography variant="h6">{Account.name}</Typography>
        <Typography variant="h6">{Account.soDienThoai}</Typography>
        <Typography variant="h6">{Account.email}</Typography>
      </CardContent>
    </Card>
  );
}

export default AppSetting
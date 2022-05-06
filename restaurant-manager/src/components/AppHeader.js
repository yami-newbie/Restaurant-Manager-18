import React, {  Fragment, useEffect, useState } from 'react'
import { AppBar, Avatar, Button, CssBaseline, GlobalStyles, Grid, Link, List, ListItemText, Stack, Toolbar, Typography } from "@mui/material"
import { useAuth } from '../services/account.service';
import UserMenu from './UserMenu';

function AppHeader() {
  const auth = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const login = () => {
    auth.signin({
      email: "test@gmail.com",
      password: "123456",
    });
  }

  useEffect(() => {
    setIsLogin(auth.user? true : false);
  }, [auth])

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  return (
    <Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Tên app
          </Typography>
          <nav>
            <Link
              color="inherit"
              underline="hover"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Home
            </Link>
            <Link
              color="inherit"
              underline="hover"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Booking
            </Link>
            <Link
              color="inherit"
              underline="hover"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Overview
            </Link>
          </nav>
          {!isLogin ? (
            <Stack sx={{ my: 1, mx: 1.5 }} direction="row" spacing={2}>
              <Button color="secondary" variant="outlined" onClick={login}>
                Login
              </Button>
              <Button color="secondary" variant="contained" onClick={login}>
                Sign up
              </Button>
            </Stack>
          ) : (
            <Avatar
              sx={{ my: 1, mx: 1.5 }}
              src="/avatar/94702183_p0.jpg"
              onClick={handleOpenUserMenu}
            />
          )}
        </Toolbar>
      </AppBar>
      <UserMenu
        anchorElUser={anchorElUser}
        handleCloseUserMenu={handleCloseUserMenu}
      />
    </Fragment>
  );
}

export default AppHeader
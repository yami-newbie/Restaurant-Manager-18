import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import React from "react";
import { useAuth } from '../services/account.service';

function UserMenu({ anchorElUser, handleCloseUserMenu }) {
    const auth = useAuth();
    return (
      <Menu
        sx={{ mt: "45px", borderRadius: "100px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuList sx={{ width: 150, maxWidth: "100%" }}>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ReceiptIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Coupon</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Setting</ListItemText>
          </MenuItem>
          <Divider light />
          <MenuItem
            onClick={() => {
              auth.signout();
              handleCloseUserMenu();
            }}
          >
            <ListItemIcon>
              <LogoutIcon color="primary" />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    );
}

export default UserMenu
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TableBarIcon from "@mui/icons-material/TableBar";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DescriptionIcon from "@mui/icons-material/Description";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Collapse, IconButton, ListItem, Menu, MenuItem } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Role, useAuth } from "../services/account.service";
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

const data = [
  {
    icon: <LocalDiningIcon />,
    label: "Đặt món",
    navigate: "/menu",
    role: Role.staff,
  },
  {
    icon: <LocalDiningIcon/>,
    label: "Đặt bàn",
    navigate: "/ordertable",
    role: Role.staff
  },
  {
    icon: <TableBarIcon />,
    label: "Bàn",
    navigate: "/table",
    role: Role.staff,
  },
  {
    icon: <FastfoodIcon />,
    label: "Món ăn",
    navigate: "/dish",
    role: Role.admin,
  },
  {
    icon: <DescriptionIcon />,
    label: "Hóa đơn",
    navigate: "/order",
    role: Role.admin,
  },
  {
    icon: <ReceiptLongIcon />,
    label: "Chưa thanh toán",
    navigate: "/order/ongoing",
    role: Role.staff,
  },
  {
    icon: <AccountCircleIcon/>,
    label: "Các tài khoản",
    navigate: "/account",
  }
];
const thongke = [
  {
    icon: <SsidChartIcon />,
    label: "Doanh thu",
    navigate: "/thongke/doanhthu",
  },
  {
    icon: <FastfoodIcon />,
    label: "Món ăn",
    navigate: "/thongke/monan",
  },
];

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const auth = useAuth();

  const handleClose = () => {
    setAnchorEl(false);
  };

  const AccountMenu = (props) => {
    const { anchorEl, onClose, onLogout } = props;
    const open = Boolean(anchorEl);

    return (
      <Menu
        id="basic-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onClose}>Profile</MenuItem>
        <MenuItem onClick={onClose}>My account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "#191919" },
          },
        })}
      >
        <Paper elevation={0} sx={{ width: 250 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon sx={{ fontSize: 24 }}>💀</ListItemIcon>
              <ListItemText
                sx={{ my: 2 }}
                primary="Undertale"
                primaryTypographyProps={{
                  fontSize: 34,
                  fontWeight: "bold",
                  letterSpacing: 0,
                }}
              />
            </ListItemButton>
            <Divider />
            {data.map((item, i) => {
              const authRole = auth?.role;
              if (authRole === item.role || authRole === Role.admin)
                return (
                  <ListItemButton
                    key={i}
                    onClick={() => {
                      navigate(item.navigate);
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    />
                  </ListItemButton>
                );
            })}
            {auth.role === Role.admin ? (
              <>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }} primary="Thống kê" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List
                    sx={{ paddingLeft: "25px" }}
                    component="div"
                    disablePadding
                  >
                    {thongke.map((item, index) => {
                      return (
                        <ListItemButton
                          key={index}
                          onClick={() => {
                            navigate(item.navigate);
                          }}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </>
            ) : null}

            <ListItem
              sx={{
                padding: 0,
              }}
              secondaryAction={
                <>
                  <IconButton
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                    }}
                  >
                    <SettingsIcon />
                  </IconButton>
                  <AccountMenu
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    onLogout={(e) => {
                      auth.signout();
                      handleClose();
                    }}
                  />
                </>
              }
            >
              <ListItemButton
                onClick={() => {
                  navigate("/thongtin");
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}>Tài khoản</ListItemText>
              </ListItemButton>
            </ListItem>
            
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

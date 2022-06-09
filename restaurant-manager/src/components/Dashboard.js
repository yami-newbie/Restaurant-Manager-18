import * as React from "react";
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
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const data = [
  { 
    icon: <TableBarIcon />, 
    label: "Menu", 
    navigate: "/menu" 
  },
  { 
    icon: <TableBarIcon />, 
    label: "Bàn", 
    navigate: "/table" 
  },
  { 
    icon: <FastfoodIcon />, 
    label: "Món ăn", 
    navigate: "/dish" 
  },
  { 
    icon: <DescriptionIcon />,
    label: "Hóa đơn",
    navigate: "/order"
  },
  {
    icon: <ReceiptLongIcon />,
    label: "Chưa thanh toán",
    navigate: "/order/ongoing",
  },
  { 
    icon: <ReceiptIcon />, 
    label: "Mã giảm giá", 
    navigate: "/coupon" 
  },
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
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

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
            <ListItemButton component="a" href="/" sx={{height: "5rem"}}>
              <ListItemIcon sx={{ fontSize: 24 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Deo Biet"
                primaryTypographyProps={{
                  fontSize: 24,
                  fontWeight: "bold",
                  letterSpacing: 0,
                }}
                
              />
              <ListItemIcon sx={{ fontSize: 24 }}>🔥</ListItemIcon>
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Thống kê" 
              primaryTypographyProps={{
                fontWeight: "bold"
              }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{ paddingLeft: "25px" }} component="div" disablePadding>
                {thongke.map((item, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      navigate(item.navigate);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
            {data.map((item) => (
              <ListItemButton
                key={item.label}
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
                    fontSize: 14,
                    fontWeight: "bold",
                  }}
                />
              </ListItemButton>
            ))}
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}

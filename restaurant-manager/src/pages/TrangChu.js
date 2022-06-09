import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StatsCard from "../components/StatsCard";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const TrangChu = () => {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  if (minute < 10) minute = "0" + minute.toString();
  var second = date.getSeconds();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  const [boxState, setBoxState] = useState({
    boxShadow: "0",
    backgroundColor: "#e28743",
  });
  return (
    <Container>
      <Box padding={2}>
        <Typography fontWeight={700} fontSize={24}>
          Dashboard
        </Typography>
        <Typography fontSize={14} paddingLeft="1px">
          {day +
            "-" +
            month +
            "-" +
            year +
            " | " +
            hour +
            ":" +
            minute +
            ":" +
            second}
        </Typography>
      </Box>
      <Grid container padding={2} spacing={2}>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard text="Tổng món ăn" value="34" type="1"></StatsCard>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard text="Tổng thu nhập" value="320.000đ" type="2"></StatsCard>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard text="Tổng order" value="124" type="3"></StatsCard>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <StatsCard text="Tổng nhân viên" value="0" type="4"></StatsCard>
        </Grid>
      </Grid>
      <Grid container padding={2} spacing={2}>
        <Grid item xs={12} sm={12} md={7}>
          <Box
            borderRadius={5}
            display="flex"
            flexDirection="column"
            backgroundColor={boxState.backgroundColor}
            width="95%"
            height="15rem"
          >
            <Box padding={2} display="flex" justifyContent="space-between">
              <Box>
                <Typography color="white" fontWeight="bold">
                  Orders Summary
                </Typography>
                <Typography paddingTop={1} color="#f2c8a9" fontSize={14}>
                  Summary of total orders in Scarlet Restaurant
                </Typography>
              </Box>
              <FormControl
                sx={{ m: 1, minWidth: 120, backgroundColor: "#e49355" }}
                size="small"
              >
                <Select sx={{ color: "white" }} displayEmpty>
                  <MenuItem value={10}>Ngày</MenuItem>
                  <MenuItem value={20}>Tháng</MenuItem>
                  <MenuItem value={30}>Năm</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Box
            borderRadius={5}
            display="flex"
            flexDirection="column"
            backgroundColor={boxState.backgroundColor}
            width="95%"
            height="15rem"
          >
            <Box padding={2} display="flex" justifyContent="space-between">
              <Box>
                <Typography color="white" fontWeight="bold">
                  Orders Statistic
                </Typography>
                <Box display="flex">
                  <Typography color="white" fontWeight={600} fontSize={14}>
                    {"180 "}
                  </Typography>
                  <Typography> &nbsp; </Typography>
                  <Typography color="#f2c8a9" fontSize={14}>
                    orders on this month
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrangChu;

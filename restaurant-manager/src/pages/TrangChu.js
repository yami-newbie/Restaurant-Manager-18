import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StatsCard from "../components/StatsCard";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Line } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const TrangChu = () => {
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgba(0,0,0,0)",
      color: "#b2b2b2",
      fontWeight: "bold",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      fontWeight: "bold",
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
    backgroundColor: "rgba(0,0,0,0.7)",
  });
  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  const rankColor = (rank) => {
    switch (rank) {
      case 1:
        return "#F48093";
      case 2:
        return "#68BB59";
      case 3:
        return "#6ac5fe"
      default:
        return "white";
    }
  }

  var labels = [
    mod(month - 6, 12) === 0 ? 12 : mod(month - 6, 12),
    mod(month - 5, 12) === 0 ? 12 : mod(month - 5, 12),
    mod(month - 4, 12) === 0 ? 12 : mod(month - 4, 12),
    mod(month - 3, 12) === 0 ? 12 : mod(month - 3, 12),
    mod(month - 2, 12) === 0 ? 12 : mod(month - 2, 12),
    mod(month - 1, 12) === 0 ? 12 : mod(month - 1, 12),
    month,
  ];
  labels = labels.map((e) => (e = "Tháng " + e));
  const data = {
    labels,
    datasets: [
      {
        data: [100, 300, 125, 247, 90, 340, 180],
        borderColor: "rgba(211,211,211, 0.8)",
        backgroundColor: "rgba(51,51,51,0.8)",
      },
    ],
  };
  const options = {
    responsive: true,
    elements: {
      line: {
        tension: 0.3,
        borderCapStyle: "round",
        borderJoinStyle: "round",
        fill: true,
      },
    },
    interaction: {
      mode: "nearest",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        ticks: {
          color: "#b2b2b2",
        },
      },
      x: {
        ticks: {
          color: "#b2b2b2",
          callback: function (val, index) {
            return index !== 0 && index !== 6 ? this.getLabelForValue(val) : "";
          },
        },
      },
    },
  };

  function createData(rank, name, category, price, soldAmount) {
    return { rank, name, category, price, soldAmount };
  }
  const rows = [
    createData(1, "Frozen yoghurt", "Tráng miệng", 1000, 10),
    createData(2, "Ice cream sandwich", "Tráng miệng", 1000, 10),
    createData(3, "Eclair", "Tráng miệng", 1000, 10),
    createData(4, "Cupcake", "Tráng miệng", 1000, 10),
    createData(5, "Gingerbread", "Tráng miệng", 1000, 10),
  ];

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    return () => {
      setInterval(() => setTime(new Date()), 1000);
    };
  }, []);

  const [value, setValue] = React.useState(0);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      height="100vh"
      sx={{
        backgroundSize: "cover",
        backgroundImage:
          "url(https://cdn.discordapp.com/attachments/945145709521432636/984530926375677952/unknown.png)",
      }}
    >
      <Container>
        <Box padding={2}>
          <Typography fontWeight={700} fontSize={24} color="white">
            Dashboard
          </Typography>
          <Typography fontSize={14} paddingLeft="1px" color="white">
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
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard text="Tổng món ăn" value="34" type="1"></StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              text="Tổng thu nhập"
              value="320.000đ"
              type="2"
            ></StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard text="Tổng order" value="124" type="3"></StatsCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
              sx={{ flexGrow: 1 }}
            >
              <Box
                padding={2}
                paddingBottom={0}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Typography color="white" fontWeight="bold">
                    Top 5 món ưa thích
                  </Typography>
                  <Typography paddingTop={1} color="#B2B2B2" fontSize={14}>
                    5 món bán được nhiều nhất trong tháng này
                  </Typography>
                </Box>
                <FormControl
                  sx={{
                    m: 1,
                    minWidth: 120,
                    backgroundColor: "rgba(225,225,225,0.1)",
                  }}
                  size="small"
                >
                  <Select value={value} sx={{ color: "white" }} displayEmpty onChange={handleChange}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>Burger</MenuItem>
                    <MenuItem value={2}>Mì Ống</MenuItem>
                    <MenuItem value={3}>Bít Tết</MenuItem>
                    <MenuItem value={4}>Tráng Miệng</MenuItem>
                    <MenuItem value={5}>Nước Uống</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box marginX={2}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Rank</StyledTableCell>
                        <StyledTableCell align="center">Món ăn</StyledTableCell>
                        <StyledTableCell align="center">
                          Loại Món
                        </StyledTableCell>
                        <StyledTableCell align="center">Giá</StyledTableCell>
                        <StyledTableCell align="center">
                          Số Lượng Bán
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell
                            sx={{ color: rankColor(row.rank), fontWeight: "bold" }}
                            align="center"
                          >
                            {row.rank}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ color: "white", fontWeight: "bold" }}
                            align="center"
                          >
                            <Box display="flex" flexDirection="row" alignItems="center">
                            <img style={{paddingRight: 3}} src="https://media.discordapp.net/attachments/945145709521432636/984539518696845382/3.png?" width="30px" height="30px"></img>
                            {row.name}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ color: "white", fontWeight: "bold" }}
                            align="center"
                          >
                            {row.category}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ color: "white", fontWeight: "bold" }}
                            align="center"
                          >
                            {row.price}
                          </StyledTableCell>
                          <StyledTableCell
                            sx={{ color: "white", fontWeight: "bold" }}
                            align="center"
                          >
                            {row.soldAmount}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
              height="20rem"
              justifyContent="space-between"
              sx={{ flexGrow: 1 }}
            >
              <Box
                paddingX={2}
                paddingTop={2}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Typography color="white" fontWeight="bold">
                    Thống kê số hóa đơn
                  </Typography>
                  <Box display="flex">
                    <Typography color="#B2B2B2" fontSize={14} paddingTop={1}>
                      Đã có
                      <span
                        style={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {" 180 "}
                      </span>{" "}
                      hóa đơn trong tháng này
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box paddingY={2} paddingX={2}>
                <Line data={data} options={options} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TrangChu;

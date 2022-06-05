import React, { useRef, useState } from "react";
import "chart.js/auto";
import { Chart, getElementsAtEvent, getDatasetAtEvent } from "react-chartjs-2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const data = [
      {
        label: "Dataset 1",
        data: [1, 5, 3, 3],
        backgroundColor: "rgba(255, 199, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [2, 1, 4, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]

const color = [
  "red", // color for data at index 0
  "blue", // color for data at index 1
  "green", // color for data at index 2
  "black", // color for data at index 3
];

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

function MonAn() {
  const chartRef = useRef();
  const [otp, setOtp] = useState("Theo ngày");

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const chartData = {
    labels: [1, 2, 3, 4],
    datasets: data,
  };

  const onClick = (event) => {
    try {
      const { datasetIndex, index } = getElementsAtEvent(chartRef.current, event)[0];

      console.log("datasetIndex", datasetIndex, "\nindex", index);
    } catch (e) {
      console.log(e);
    }
    
    //console.log(getDatasetAtEvent(chartRef.current, event));
  };

  const SelectOtp = () => {

    return (
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={otp}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"Theo ngày"}>Theo ngày</MenuItem>
          <MenuItem value={"Theo tháng"}>Theo tháng</MenuItem>
          <MenuItem value={"Theo năm"}>Theo năm</MenuItem>
        </Select>
      </FormControl>
    );
  }

  return (
    <>
      <SelectOtp/>
      <Chart
        ref={chartRef}
        onClick={onClick}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "left",
            },
            title: {
              display: true,
              text: "Test",
            },
          },
        }}
        type="bar"
        data={chartData}
      />
    </>
  );
}

export default MonAn;

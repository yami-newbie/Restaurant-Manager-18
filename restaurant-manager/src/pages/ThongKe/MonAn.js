import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import { Chart, getElementsAtEvent, getDatasetAtEvent } from "react-chartjs-2";
import SelectThongKe from "../../components/custom/SelectThongKe";
import { Box } from "@mui/system";


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
];

const color = [
  "red", // color for data at index 0
  "blue", // color for data at index 1
  "green", // color for data at index 2
  "black", // color for data at index 3
];

function MonAn() {
  const chartRef = useRef();
  const [otp, setOtp] = useState("");
  const [monthSelect, setMonthSelect] = useState("");
  const [dateSelect, setDateSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [chartData, setChartData] = useState({
    labels: () => {},
    datasets: data,
  });
  useEffect(() => {
    const date = new Date();
    setDateSelect(date);
    setMonthSelect(date.getMonth() + 1);
    setYearSelect(date.getFullYear());
    setOtp("Theo ngày");
  }, []);

  useEffect(() => {
    if(otp === "Theo ngày"){
      function hourInDays() {
        let value = [];
        for (var i = 0; i <= 24; i++) {
          value.push(i);
        }
        return value;
      }
      setChartData({
        ...chartData,
        labels: hourInDays(),
      });
    }
    if (otp === "Theo tháng") {
      function daysInMonth(month, year) {
        const count = new Date(year, month, 0).getDate();
        let value = [];
        for (var i = 1; i <= count; i++) {
          value.push(i);
        }
        return value;
      }
      setChartData({
        ...chartData,
        labels: daysInMonth(monthSelect, yearSelect),
      });
    }
  }, [otp, monthSelect, yearSelect])

  const onClick = (event) => {
    try {
      const { datasetIndex, index } = getElementsAtEvent(
        chartRef.current,
        event
      )[0];

      console.log("datasetIndex", datasetIndex, "\nindex", index);
    } catch (e) {
      console.log(e);
    }

    //console.log(getDatasetAtEvent(chartRef.current, event));
  };

  

  return (
    <Box sx={{m: 2}}>
      <SelectThongKe
        otp={otp}
        years={[2021, 2022]}
        dateSelect={dateSelect}
        monthSelect={monthSelect}
        MonthChange={(e) => setMonthSelect(e.target.value)}
        OtpChange={(e) => setOtp(e.target.value)}
        yearSelect={yearSelect}
        yearChange={(e) => setYearSelect(e.target.value)}
        dateChange={(e) => setDateSelect(e)}
      />

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
    </Box>
  );
}

export default MonAn;

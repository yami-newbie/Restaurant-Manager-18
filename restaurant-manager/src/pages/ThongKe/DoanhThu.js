import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import { Bar, getElementsAtEvent, Line } from "react-chartjs-2";
import SelectThongKe, { Option } from "../../components/custom/SelectThongKe";
import { Box } from "@mui/system";
import { useDishService } from "../../services/thucan.service";
import { useCT_OrderService } from "../../services/ct_hoadon.service";
import { useOrderService } from "../../services/hoadon.service";
import { Timestamp } from "firebase/firestore";

const data = [
  {
    label: "Dataset 1",
    data: [1.9, 5, 3, 3],
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    label: "Dataset 2",
    data: [2, 1, 4, 6],
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
  },
];

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [`rgb(${r},${g},${b})`, `rgba(${r},${g},${b},0.5)`];
}

function daysInMonth(month, year) {
  const count = new Date(year, month, 0).getDate();
  let value = [];
  for (var i = 1; i <= count; i++) {
    value.push(i);
  }
  return value;
}

function hourInDays() {
  let value = [];
  for (var i = 0; i <= 24; i++) {
    value.push(i);
  }
  return value;
}

function DoanhThu() {
  const chartRef = useRef();
  const [otp, setOtp] = useState("");
  const [monthSelect, setMonthSelect] = useState("");
  const [dateSelect, setDateSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [orders, setOrders] = useState([]);

  const hoadon = useOrderService();

  const [chartData, setChartData] = useState({
    labels: () => {},
    datasets: data,
  });

  const [option, setOption] = useState({
    responsive: true,
    scales: {
      y: {
        // suggestedMax: 10,
        suggestedMin: 0,
      },
    },

    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Thống kê doanh thu",
        font: {
          size: 32,
        },
      },
    },
  });

  const getOrdersByDate = (date) => {
    if (orders) {
      return orders.filter((e) => {
        const time = new Timestamp(e.data.ThoiGian.seconds, 0).toDate();
        return time.toLocaleDateString() === date.toLocaleDateString();
      });
    }
  };

  const getOrdersByMonth = (month, year) => {
    if (orders) {
      return orders.filter((e) => {
        const time = new Timestamp(e.data.ThoiGian.seconds, 0).toDate();
        return time.getMonth() + 1 === month && time.getFullYear() === year;
      });
    }
  };

  const getOrdersByYear = (year) => {
    if (orders) {
      return orders.filter((e) => {
        const time = new Timestamp(e.data.ThoiGian.seconds, 0).toDate();
        return time.getFullYear() === year;
      });
    }
  };

  const getDataSet = (dish) => {
    let _data = null;
    const color = getRandomColor();
    if (otp === Option.day) {
      _data = hourInDays();
      _data.fill(0);
      const log = dish.Log;
      log.forEach((element) => {
        const time = new Timestamp(element.time.seconds, 0).toDate();
        const hour = time.getHours();
        _data[hour] += element.count;
      });
    }
    if (otp === Option.month) {
      _data = daysInMonth(monthSelect, yearSelect);
      console.log(_data);
      _data.fill(0);
      const log = dish.Log;
      log.forEach((element) => {
        const time = new Timestamp(element.time.seconds, 0).toDate();
        const day = time.getDate() - 1;
        _data[day] += element.count;
      });
    }
    if (otp === Option.year) {
      _data = Array(12);
      _data.fill(0);
      const log = dish.Log;
      log.forEach((element) => {
        const time = new Timestamp(element.time.seconds, 0).toDate();
        const month = time.getMonth();
        _data[month] += element.count;
      });
    }
    return {
      label: dish.data.TenThucAn,
      data: _data,
      borderColor: color[0],
      backgroundColor: color[1],
    };
  };

  useEffect(() => {
    // console.log(dishes)
    if (hoadon) {
      setOrders(hoadon.orders);
    }
  }, [hoadon]);

  useEffect(() => {
    setOtp(Option.day);
  }, []);

  useEffect(() => {
    if (otp === Option.day) {
      setDateSelect(new Date());
      setYearSelect("");
      setMonthSelect("");
    }
    if (otp === Option.month) {
      setYearSelect(new Date().getFullYear());
      setMonthSelect(new Date().getMonth() + 1);
      setDateSelect("");
    }
    if (otp === Option.year) {
      setMonthSelect("");
      setYearSelect(new Date().getFullYear());
      setDateSelect("");
    }
  }, [otp]);

  useEffect(() => {
    if (otp === Option.day) {
      const listHoaDon = getOrdersByDate(dateSelect);

      let _data = hourInDays();
      _data.fill(0);

      listHoaDon.forEach((e) => {
        const time = new Timestamp(
          e.data.ThoiGian.seconds,
          e.data.ThoiGian.nanoseconds
        ).toDate();
        const hour = time.getHours() - 1;
        _data[hour] += e.data.TongTien;
      });

      const color = getRandomColor();

      setChartData({
        datasets: [
          {
            label: "Doanh thu",
            data: _data,
            borderColor: color[0],
            backgroundColor: color[1],
          },
        ],
        labels: hourInDays(),
      });
    }

    if (otp === Option.month) {
      const listHoaDon = getOrdersByMonth(monthSelect, yearSelect);

      let _data = daysInMonth(monthSelect, yearSelect);

      _data.fill(0);

      listHoaDon.forEach((e) => {
        const time = new Timestamp(
          e.data.ThoiGian.seconds,
          e.data.ThoiGian.nanoseconds
        ).toDate();
        const day = time.getDate() - 1;
        _data[day] += e.data.TongTien;
      });
      const color = getRandomColor();

      setChartData({
        datasets: [
          {
            label: "Doanh thu",
            data: _data,
            borderColor: color[0],
            backgroundColor: color[1],
          },
        ],
        labels: daysInMonth(monthSelect, yearSelect),
      });
    }

    if (otp === Option.year) {
      const listHoaDon = getOrdersByYear(yearSelect);

      const color = getRandomColor();
      let _data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      _data.fill(0);

      listHoaDon.forEach((e) => {
        const time = new Timestamp(
          e.data.ThoiGian.seconds,
          e.data.ThoiGian.nanoseconds
        ).toDate();
        const month = time.getMonth();
        _data[month] += e.data.TongTien;
      });

      setChartData({
        datasets: [
          {
            label: "Doanh thu",
            data: _data,
            borderColor: color[0],
            backgroundColor: color[1],
          },
        ],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      });
    }
  }, [monthSelect, yearSelect, dateSelect]);

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
  };

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Box sx={{ pt: 2, pr: 2 }}>
        <SelectThongKe
          otp={otp}
          dateSelect={dateSelect}
          monthSelect={monthSelect}
          yearSelect={yearSelect}
          years={[2021, 2022]}
          MonthChange={(e) => setMonthSelect(e.target.value)}
          OtpChange={(e) => setOtp(e.target.value)}
          yearChange={(e) => setYearSelect(e.target.value)}
          dateChange={(e) => setDateSelect(e ? e : dateSelect)}
        />
      </Box>

      <Bar ref={chartRef} options={option} data={chartData} onClick={onClick} />
    </Box>
  );
}

export default DoanhThu;

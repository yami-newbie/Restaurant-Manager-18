import React, { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import {
  getElementsAtEvent,
  Line,
} from "react-chartjs-2";
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

function MonAn() {
  const chartRef = useRef();
  const [otp, setOtp] = useState("");
  const [monthSelect, setMonthSelect] = useState("");
  const [dateSelect, setDateSelect] = useState("");
  const [yearSelect, setYearSelect] = useState("");
  const [dishes, setDishes] = useState([]);
  const [ct_orders, setCt_orders] = useState([]);
  const [orders, setOrders] = useState([]);

  const dishService = useDishService();
  const ct_hoadon = useCT_OrderService();
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
        text: "Thống kê lượt gọi món",
        font: {
          size: 32,
        },
      },
    }
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
    if(otp === Option.day) {
      _data = hourInDays();
      _data.fill(0);
      const log = dish.Log;
      log.forEach(element => {
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
  }

  useEffect(() => {
    if (ct_orders) {
      setDishes(
        dishes.map((dish) => {
          const listOrder = ct_orders.filter(
            (order) => order.data.IDThucAn === dish.id
          );
          if (listOrder.length > 0) {
            const log = listOrder.map(element => {
              const order = orders.filter(e => e.id === element.data.IDHoaDon);
              return {time: order[0].data.ThoiGian, count: element.data.SoLuong}
            })
            return { ...dish, Log: log };
          } else return { ...dish, Log: [] };
        })
      );
    }
  }, [ct_orders, orders]);

  useEffect(() => {
    if (dishService.dishes) {
      const dishList = dishService.dishes;
      setDishes(
        dishList.map((e) => {
          if (dishes.length > 0) {
            const dish = dishes.filter((_e) => _e.id === e.id);
            if (dish.length > 0) {
              return {
                ...dish[0],
                ...e,
              };
            }
          }
          return e;
        })
      );
    }
  }, [dishService]);

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
    if(dishes){
      if( typeof(dishes[0]?.Log) !== "undefined" ){
        setChartData({...chartData , datasets: dishes.map((e) => getDataSet(e))});
      }
    }
  }, [dishes])

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

      if (listHoaDon.length > 0)
        ct_hoadon.getCT_HoaDonByListHoaDon(listHoaDon).then((res) => {
          setCt_orders(res);
        });
      else {
        setCt_orders([]);
      }
      
      setChartData({
        ...chartData,
        labels: hourInDays(),
      });
    }

    if (otp === Option.month) {
      const listHoaDon = getOrdersByMonth(monthSelect, yearSelect);

      if (listHoaDon.length > 0)
        ct_hoadon.getCT_HoaDonByListHoaDon(listHoaDon).then((res) => {
          setCt_orders(res);
        });
      else {
        setCt_orders([]);
      }
      
      setChartData({
        ...chartData,
        labels: daysInMonth(monthSelect, yearSelect),
      });
    }

    if (otp === Option.year) {

      const listHoaDon = getOrdersByYear(yearSelect);

      if (listHoaDon.length > 0)
        ct_hoadon.getCT_HoaDonByListHoaDon(listHoaDon).then((res) => {
          setCt_orders(res);
        });
      else {
        setCt_orders([]);
      }

      setChartData({
        ...chartData,
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
      <Box sx={{pt: 2, pr: 2}}>
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

      <Line
        ref={chartRef}
        options={option}
        data={chartData}
        onClick={onClick}
      />
    </Box>
  );
}

export default MonAn;

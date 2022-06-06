import React from "react";
import { useOrderService } from "../../services/hoadon.service";
import HoaDonPage from "../Share/HoaDon";

function QuanLyHoaDon() {
  const dataService = useOrderService();

  return (
    <HoaDonPage list={dataService.orders}/>
  );
}

export default QuanLyHoaDon;

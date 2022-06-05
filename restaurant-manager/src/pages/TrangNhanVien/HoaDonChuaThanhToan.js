import React from 'react'
import { useOrderService } from '../../services/hoadon.service';
import HoaDonPage from '../Share/HoaDon';

function HoaDonChuaThanhToan() {
  const dataService = useOrderService();
  
  return <HoaDonPage list={dataService.ordersDisable} />;
}

export default HoaDonChuaThanhToan
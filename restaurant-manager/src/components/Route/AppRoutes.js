import React, { useEffect, useState } from "react";

import SignUp from "../Account/SignUp";
import SignIn from "../SignIn";
import TrangChu from "../../pages/TrangChu";
import QuanLyBan from "../../pages/TrangQuanLy/Ban";
import QuanLyMonAn from "../../pages/TrangQuanLy/MonAn";
import QuanLyHoaDon from "../../pages/TrangQuanLy/HoaDon";
import QuanLyMaGiamGia from "../../pages/TrangQuanLy/MaGiamGia";
import ThongKeDoanhThu from "../../pages/ThongKe/DoanhThu";
import ThongKeMonAn from "../../pages/ThongKe/MonAn";
import BookTable from "../../pages/BookTable";
import HoaDonChuaThanhToan from "../../pages/TrangNhanVien/HoaDonChuaThanhToan";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Role, useAuth } from "../../services/account.service";
import { Box } from "@mui/system";
import Dashboard from "../Dashboard";
import Menu from '../../pages/menu'
import ThongTin from "../../pages/ThongTin";

function AppRoutes() {
  const auth = useAuth();

  const PrivateOutlet = ({user}) => {
    return user ? <Outlet /> : <Navigate to="/signin" />;
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      {auth.user ? <Dashboard /> : null}
      <Box sx={{ width: "100%" }}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<PrivateOutlet user={auth.user} />}>
            <Route path="/" element={<TrangChu />} />
            <Route path="/table" element={<QuanLyBan />} />
            <Route path="/ordertable" element={<BookTable />} />
            <Route path="/order/ongoing" element={<HoaDonChuaThanhToan />} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/thongtin" element={<ThongTin />} />

            {auth.role === Role.admin ? (
              <>
                <Route path="/dish" element={<QuanLyMonAn />} />
                <Route path="/order" element={<QuanLyHoaDon />} />
                <Route path="/coupon" element={<QuanLyMaGiamGia />} />
                <Route path="/thongke/doanhthu" element={<ThongKeDoanhThu />} />
                <Route path="/thongke/monan" element={<ThongKeMonAn />} />
              </>
            ) : null}
          </Route>
        </Routes>
      </Box>
    </Box>
  );
}

export default AppRoutes;

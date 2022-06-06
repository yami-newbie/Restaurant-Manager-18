import { React, useEffect, useState } from 'react'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TrangChu from './pages/TrangChu';
import { ThemeProvider } from '@emotion/react';
import theme from "./theme/theme.json";
import { createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';
import { Box } from '@mui/system';
import QuanLyBan from './pages/TrangQuanLy/Ban';
import QuanLyMonAn from "./pages/TrangQuanLy/MonAn";
import QuanLyHoaDon from "./pages/TrangQuanLy/HoaDon";
import QuanLyMaGiamGia from "./pages/TrangQuanLy/MaGiamGia";
import ThongKeDoanhThu from './pages/ThongKe/DoanhThu';
import ThongKeMonAn from './pages/ThongKe/MonAn';
import AppProvider from './components/AppProvider';
import BookTable from './pages/BookTable';
import HoaDonChuaThanhToan from './pages/TrangNhanVien/HoaDonChuaThanhToan';

function App() {
  const [height, setHeight] = useState(window.innerHeight - 0.05)
  const newTheme = createTheme(theme);
  window.onresize=() => {
    setHeight(window.innerHeight - 0.05)
  }
  return (
    <Box sx={{ display: "flex", height: height }}>
      <ThemeProvider theme={newTheme}>
        <AppProvider>
          <BrowserRouter>
            <Dashboard />
            <Box sx={{ overflow: "hidden", width: "100%", bgcolor: "#f0f2f5" }}>
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<TrangChu />} />
                <Route path="/table" element={<QuanLyBan />} />
                <Route path="/dish" element={<QuanLyMonAn />} />
                <Route path="/order" element={<QuanLyHoaDon />} />
                <Route path="/coupon" element={<QuanLyMaGiamGia />} />
                <Route path="/ordertable" element={<BookTable/>}/>
                <Route path="/order/ongoing" element={<HoaDonChuaThanhToan />} />
                <Route path="/thongke/doanhthu" element={<ThongKeDoanhThu />} />
                <Route path="/thongke/monan" element={<ThongKeMonAn />} />
              </Routes>
            </Box>
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </Box>
  );
}

export default App;

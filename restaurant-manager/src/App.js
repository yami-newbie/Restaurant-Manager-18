import { React } from 'react'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TrangChu from './pages/TrangChu';
import { ProvideAuth } from './services/account.service';
import { ThemeProvider } from '@emotion/react';
import theme from "./theme/theme.json";
import { createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';
import { Box } from '@mui/system';
import QuanLyBan from './pages/TrangQuanLy/Ban';
import QuanLyMonAn from "./pages/TrangQuanLy/MonAn";
import QuanLyHoaDon from "./pages/TrangQuanLy/HoaDon";
import QuanLyMaGiamGia from "./pages/TrangQuanLy/MaGiamGia";
import ThongKeHoaDon from './pages/ThongKe/HoaDon';

function App() {
  const newTheme = createTheme(theme);
  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={newTheme}>
        <ProvideAuth>
          <BrowserRouter>
            <Dashboard />
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<TrangChu />} />
              <Route path="/table" element={<QuanLyBan />} />
              <Route path="/dish" element={<QuanLyMonAn />} />
              <Route path="/order" element={<QuanLyHoaDon />} />
              <Route path="/coupon" element={<QuanLyMaGiamGia />} />
              <Route path="/thongke/order" element={<ThongKeHoaDon />} />
            </Routes>
          </BrowserRouter>
        </ProvideAuth>
      </ThemeProvider>
    </Box>
  );
}

export default App;

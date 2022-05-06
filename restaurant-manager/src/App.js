import { React } from 'react'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import { ProvideAuth } from './services/account.service';
import { ThemeProvider } from '@emotion/react';
import theme from "./theme/theme.json";
import { createTheme } from '@mui/material';
import OrderTable from './pages/OrderTablePage';
import Dashboard from './components/Dashboard';
import { Box } from '@mui/system';

function App() {
  const newTheme = createTheme(theme);
  return (
    <ThemeProvider theme={newTheme}>
      <ProvideAuth>
        <Box sx={{display: "flex"}}>
          <Dashboard />
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/" element={<OrderTable />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;

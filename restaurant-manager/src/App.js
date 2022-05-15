import { React } from 'react'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import { ProvideAuth } from './services/account.service';
import { ThemeProvider } from '@emotion/react';
import theme from "./theme/theme.json";
import { createTheme } from '@mui/material';
import TablePage from './pages/TablePage';

function App() {
  const newTheme = createTheme(theme);
  return (
    <ThemeProvider theme={newTheme}>
      <ProvideAuth>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/table" element={<TablePage/>}/>
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default App;

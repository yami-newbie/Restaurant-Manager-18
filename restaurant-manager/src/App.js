import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme.json";
import { createTheme } from "@mui/material";
import AppRoutes from "./components/Route/AppRoutes";
import AppProvider from "./components/AppProvider";

function App() {
  const newTheme = createTheme(theme);
  return (
    <ThemeProvider theme={newTheme}>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

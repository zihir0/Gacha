import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import AdminLoginPage from "scenes/admin/adminLoginPage";
import ProtectedRoute from "ProtectedRoutes";
import InventoryPage from "scenes/inventoryPage";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const role = useSelector((state) => state.role);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/inventory"
              element={isAuth ? <InventoryPage /> : <Navigate to="/" />}
            />

            {/*Admin Routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              element={<ProtectedRoute role={role} isAuth={isAuth} />}
            ></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

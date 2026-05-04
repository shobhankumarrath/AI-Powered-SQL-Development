import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardHome from "./pages/DashboardHome";
import SqlValidator from "./pages/SqlValidator";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardHome />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sql-validator"
          element={
            <ProtectedRoute>
              <Layout>
                <SqlValidator />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

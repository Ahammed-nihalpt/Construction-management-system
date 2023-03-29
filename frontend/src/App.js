import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/Landing Page/LandingPage";
import CompanyRouter from "./Router/CompanyRouter";
import UserRouter from "./Router/UserRouter";
import UserLogin from "./Components/User/User Login/UserLogin";
import AdminLogin from "./Components/Admin/Admin Login/AdminLogin";
import AdminRouter from "./Router/AdminRouter";
import PermissionDenied from "./Components/Permission Denied/PermissionDenied";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/company/*" element={<CompanyRouter />} />

          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/user/*"
            element={token ? <UserRouter /> : <Navigate to="/" />}
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={token ? <AdminRouter /> : <Navigate to="/" />}
          />
          <Route path="/403" element={<PermissionDenied />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

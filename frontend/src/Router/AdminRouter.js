import React from "react";
import { Route, Routes } from "react-router-dom";
import Companies from "../Pages/Admin/Companies/Companies";
import AdminHome from "../Pages/Admin/Home/AdminHome";

function AdminRouter() {
  return (
    <Routes>
      <Route path="/home" element={<AdminHome />} />
      <Route path="/companies" element={<Companies />} />
    </Routes>
  );
}

export default AdminRouter;

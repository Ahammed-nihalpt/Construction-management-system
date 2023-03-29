import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Opt from "../Components/Company/Company OTP/opt";
import CompanyPassword from "../Components/Company/Company password/CompanyPassword";
import CompanyRegistration from "../Components/Company/Company registration/CompanyRegistration";
import CompanyLogin from "../Components/Company/CompanyLogin/CompanyLogin";
import Chat from "../Pages/Chat Page/Chat";
import Home from "../Pages/Company/Home/Home";
import CompanyPayment from "../Pages/Company/Payment/CompanyPayment";
import Project from "../Pages/Company/Projects/Project";
import Report from "../Pages/Company/Report/Report";
import User from "../Pages/Company/Users/User";

function CompanyRouter() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<CompanyLogin />} />
      <Route path="/signup" element={<CompanyRegistration />} />
      <Route path="/otp" element={<Opt />} />
      <Route path="/setpassword" element={<CompanyPassword />} />
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/company/login" />}
      />
      <Route
        path="/projects"
        element={
          token ? <Project type="view" /> : <Navigate to="/company/login" />
        }
      />
      <Route
        path="/projects/add"
        element={
          token ? <Project type="add" /> : <Navigate to="/company/login" />
        }
      />
      <Route
        path="/projects/view"
        element={
          token ? (
            <Project type="single" action="view" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/projects/view/edit"
        element={
          token ? (
            <Project type="single" action="edit" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/projects/view/schedule"
        element={
          token ? (
            <Project type="single" action="schedule" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />

      <Route
        path="/projects/view/progress"
        element={
          token ? (
            <Project type="single" action="progress" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/projects/view/users"
        element={
          token ? (
            <Project type="single" action="access" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/users"
        element={
          token ? <User type="view" /> : <Navigate to="/company/login" />
        }
      />
      <Route
        path="/users/add"
        element={token ? <User type="add" /> : <Navigate to="/company/login" />}
      />
      <Route
        path="/users/desgination"
        element={
          token ? <User type="designation" /> : <Navigate to="/company/login" />
        }
      />
      <Route
        path="/users/view"
        element={
          token ? (
            <User type="single" action="details" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/users/view/edit"
        element={
          token ? (
            <User type="single" action="edit" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/payment"
        element={token ? <CompanyPayment /> : <Navigate to="/company/login" />}
      />
      <Route
        path="/chat"
        element={
          token ? <Chat account="company" /> : <Navigate to="/company/login" />
        }
      />
      <Route
        path="/report"
        element={token ? <Report /> : <Navigate to="/company/login" />}
      />
    </Routes>
  );
}

export default CompanyRouter;

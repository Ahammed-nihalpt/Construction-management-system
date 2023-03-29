import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PermissionDenied from "../Components/PermissionDenied/PermissionDenied";
import {
  getPermissionEndpoint,
  getUserDataEndpoint,
} from "../Helpers/config/axiosUserEndpoins";
import Chat from "../Pages/ChatPage/Chat";
import UserHome from "../Pages/User/Home/UserHome";
import UserPaymentPage from "../Pages/User/Payment/UserPaymentPage";
import UserProject from "../Pages/User/Project/UserProject";

function UserRouter() {
  const token = localStorage.getItem("token");
  const [permission, setPermission] = useState({});
  useEffect(() => {
    getUserDataEndpoint(localStorage.getItem("id")).then((response) => {
      if (response.data.success) {
        getPermissionEndpoint(response.data.userData.designation_id).then(
          (res) => {
            const per = res.data.doc;
            setPermission(per);
          }
        );
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/home"
        element={token ? <UserHome /> : <Navigate to={"/user/login"} />}
      />
      <Route
        path="/projects"
        element={
          Object.keys(permission).length > 0 && permission.project.view ? (
            <UserProject type="view" />
          ) : (
            <PermissionDenied />
          )
        }
      />
      <Route
        path="/projects/view"
        element={
          token ? (
            <UserProject type="single" action="view" />
          ) : (
            <Navigate to={"/user/login"} />
          )
        }
      />
      <Route
        path="/projects/view/edit"
        element={
          token ? (
            <UserProject type="single" action="edit" />
          ) : (
            <Navigate to={"/user/login"} />
          )
        }
      />
      <Route
        path="/projects/view/progress"
        element={
          token ? (
            <UserProject type="single" action="progress" />
          ) : (
            <Navigate to={"/user/login"} />
          )
        }
      />
      <Route
        path="/projects/view/schedule"
        element={
          token ? (
            <UserProject type="single" action="schedule" />
          ) : (
            <Navigate to="/company/login" />
          )
        }
      />
      <Route
        path="/projects/view/all/progress"
        element={
          token ? (
            <UserProject type="allProgress" action="view" />
          ) : (
            <Navigate to={"/user/login"} />
          )
        }
      />
      <Route
        path="/projects/view/add/progress"
        element={
          token ? (
            <UserProject type="addProgress" />
          ) : (
            <Navigate to={"/user/login"} />
          )
        }
      />
      <Route
        path="/payment"
        element={
          token ? (
            <UserPaymentPage type="user" />
          ) : (
            <Navigate to={"/user/login"} />
          )
        }
      />
      <Route
        path="/chat"
        element={
          token ? <Chat account="user" /> : <Navigate to={"/user/login"} />
        }
      />
    </Routes>
  );
}

export default UserRouter;

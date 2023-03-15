import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PermissionDenied from "../Components/Permission Denied/PermissionDenied";
import {
  getPermissionEndpoint,
  getUserDataEndpoint,
} from "../Helpers/config/axiosUserEndpoins";
import UserHome from "../Pages/User/Home/UserHome";
import UserProject from "../Pages/User/Project/UserProject";

function UserRouter() {
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
      <Route path="/home" element={<UserHome />} />
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
        element={<UserProject type="single" action="view" />}
      />
      <Route
        path="/projects/view/edit"
        element={<UserProject type="single" action="edit" />}
      />
      <Route
        path="/projects/view/progress"
        element={<UserProject type="single" action="progress" />}
      />
      <Route
        path="/projects/view/all/progress"
        element={<UserProject type="allProgress" action="view" />}
      />
      <Route
        path="/projects/view/add/progress"
        element={<UserProject type="addProgress" />}
      />
    </Routes>
  );
}

export default UserRouter;

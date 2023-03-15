import React from "react";
import { useSelector } from "react-redux";
import AdminCompanies from "../../../Components/Admin/Admin companies/AdminCompanies";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";

function Companies() {
  return (
    <div>
      <div className="project">
        <div className="side_nav">
          <Sidebar type="admin" />
        </div>
        <div
          className={
            !useSelector((state) => {
              return state.toggle;
            })
              ? "home_left"
              : "home_left_mod"
          }
        >
          <div className="top_nav">
            <Topnav />
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AdminCompanies />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;

import React from "react";
import { useSelector } from "react-redux";
import CompanyAllPayments from "../../../Components/Company/All Payment/CompanyAllPayments";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";

function CompanyPayment() {
  return (
    <div>
      <div className="project">
        <div className="side_nav">
          <Sidebar type="company" />
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
          <div className="h-100">
            <CompanyAllPayments />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPayment;

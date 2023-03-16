import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";
import UserPayment from "../../../Components/User/User Payment/UserPayment";

function UserPaymentPage() {
  return (
    <div>
      <div className="project">
        <div className="side_nav">
          <Sidebar type="user" />
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
            <UserPayment type="user" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPaymentPage;

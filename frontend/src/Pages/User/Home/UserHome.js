import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";
import UserDashboard from "../../../Components/User/Dashboard/UserDashboard";

function UserHome() {
  // eslint-disable-next-line no-unused-vars
  const [toggle, setToggle] = useState(
    useSelector((state) => {
      return state.toggle;
    })
  );
  return (
    <div className="home">
      <div className="side_nav">
        <Sidebar type="user" />
      </div>
      <div className={!toggle ? "home_left" : "home_left_mod"}>
        <div className="top_nav">
          <Topnav />
        </div>
        <UserDashboard />
      </div>
    </div>
  );
}

export default UserHome;

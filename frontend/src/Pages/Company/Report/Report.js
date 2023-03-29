import React, { useState } from "react";
import { useSelector } from "react-redux";
import CompanyReports from "../../../Components/Company/CompanyReports/CompanyReports";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";

function Report() {
  // eslint-disable-next-line no-unused-vars
  const [toggle, setToggle] = useState(
    useSelector((state) => {
      return state.toggle;
    })
  );
  return (
    <div className="home">
      <div className="side_nav">
        <Sidebar type="company" />
      </div>
      <div className={!toggle ? "home_left" : "home_left_mod"}>
        <div className="top_nav">
          <Topnav />
        </div>
        <CompanyReports />
      </div>
    </div>
  );
}

export default Report;

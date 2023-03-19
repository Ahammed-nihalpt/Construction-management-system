import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";
import "./Home.css";

function Home() {
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
        <div></div>
      </div>
    </div>
  );
}

export default Home;

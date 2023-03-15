import React from "react";
import "./Topnav.css";
function Topnav() {
  return (
    <div className="navmain">
      <div className="top">
        <div className="left col-6">Dashboard</div>
        <div className="right">
          <i class="fa-solid fa-bell rotate"></i>
          <div>
            <i class="fa-solid fa-user"></i>
            <ul class="dropdown">
              <li>
                <label>Sub-1</label>
              </li>
              <li>
                <label>Sub-2</label>
              </li>
              <li>
                <label>Sub-3</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topnav;

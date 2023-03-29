import React from "react";
import { useSelector } from "react-redux";
import CompanyAddDesignation from "../../../Components/Company/CompanyAddDesignation/CompanyAddDesignation";
import CompanyAddUser from "../../../Components/Company/CompanyAddUser/CompanyAddUser";
import CompanyUsers from "../../../Components/Company/CompanyUsers/CompanyUsers";
import SingleUserView from "../../../Components/Company/UserSingleView/SingleUserView";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";
import "./User.css";

function User({ type, action }) {
  return (
    <div className="company_users">
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
        {type === "view" && (
          <div>
            <CompanyUsers />
          </div>
        )}
        {type === "add" && (
          <div>
            <CompanyAddUser />
          </div>
        )}

        {type === "designation" && (
          <div>
            <CompanyAddDesignation />
          </div>
        )}

        {type === "single" && (
          <div>
            <SingleUserView action={action} />
          </div>
        )}
      </div>
    </div>
  );
}

export default User;

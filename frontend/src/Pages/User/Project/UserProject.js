import React from "react";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";
import { useSelector } from "react-redux";
import UserProjectView from "../../../Components/User/UserProjectView/UserProjectView";
import UserProjectSingleView from "../../../Components/User/UserProjectSingleView/UserProjectSingleView";
import ViewAllProgress from "../../../Common/ViewAllProgress/ViewAllProgress";
import AddProgress from "../../../Components/User/ProjectProgress/AddProgress/AddProgress";

function UserProject({ type, action }) {
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
          {type === "view" && (
            <div>
              <UserProjectView />
            </div>
          )}
          {type === "single" && (
            <div>
              <UserProjectSingleView action={action} />
            </div>
          )}
          {type === "allProgress" && (
            <div className="h-100">
              <ViewAllProgress action={action} />
            </div>
          )}
          {type === "addProgress" && (
            <div className="h-100">
              <AddProgress action={action} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProject;

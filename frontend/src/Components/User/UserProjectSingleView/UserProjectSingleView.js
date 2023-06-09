import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSingleProjectUserEndpoint } from "../../../Helpers/config/axiosUserEndpoins";
import { AddData } from "../../../Redux/Company/Action";
import { Image_URL } from "../../../Keys";
import AddUserAccess from "../../Company/ProjectAction/AddUserAccess/AddUserAccess";
import ProjectDetails from "../../Company/ProjectAction/ProjectDetails/ProjectDetails";
import ProjectSchedule from "../../Company/ProjectAction/ProjectSchedule/ProjectSchedule";
import SideMenu from "../../Company/ProjectAction/SideMenu/SideMenu";
import ViewProgress from "../ProjectProgress/ViewProgress/ViewProgress";

function UserProjectSingleView({ action }) {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [project, setProject] = useState({});
  const value = useSelector((state) => state.data);
  useEffect(() => {
    if (state.id) {
      getSingleProjectUserEndpoint(state.id).then((response) => {
        dispatch(AddData(response.data.data));
        setProject(response.data.data);
      });
    } else {
      setProject(value);
    }
  }, [dispatch, state.id, value]);

  return (
    <div className="single_project_view">
      {project && (
        <div className="profile">
          <div className="project_image col-md-6">
            <div className="img">
              <img
                src={`${Image_URL}/image/projects/${project.image}.jpg`}
                alt="..."
              ></img>
            </div>
          </div>
          <div className="project_details col-md-6">
            <div className="details">
              <label>Name: {project.project_name}</label>
              <label>Location: {project.location}</label>
              <label>Status: On Going</label>
            </div>
          </div>
        </div>
      )}
      <div className="action row">
        <div className="left_option col-3">
          <SideMenu id={state.id} type="project" user="user" />
        </div>
        {action === "view" && (
          <div className="right_option col-9">
            <ProjectDetails id={state.id} user="user" />
          </div>
        )}
        {/* {action === "edit" && (
          <div className="right_option col-9">
            <EditProject id={state.id} />
          </div>
        )} */}
        {action === "progress" && (
          <div className="right_option col-9">
            <ViewProgress id={state.id} />
          </div>
        )}

        {action === "schedule" && (
          <div className="right_option col-9">
            <ProjectSchedule id={state.id} user="user" />
          </div>
        )}
        {action === "access" && (
          <div className="right_option col-9">
            <AddUserAccess id={state.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProjectSingleView;

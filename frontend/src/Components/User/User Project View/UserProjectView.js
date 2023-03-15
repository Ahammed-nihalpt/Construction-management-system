import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getPermissionEndpoint,
  getUserDataEndpoint,
  getUserProjectsEndpoint,
} from "../../../Helpers/config/axiosUserEndpoins";

function UserProjectView() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value !== "") {
      const filteredProject = projects.filter((value) =>
        value.project_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setResult(filteredProject);
    }
  };

  const onProjectClick = (id) => {
    navigate("/user/projects/view", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    getUserDataEndpoint(localStorage.getItem("id")).then((res) => {
      if (res.data.success) {
        getPermissionEndpoint(res.data.userData.designation_id).then(
          (response) => {
            if (response.data.success) {
              const per = response.data.doc;
              console.log(per);
              setPermissions(per);
            }
          }
        );
      }
    });
    getUserProjectsEndpoint(localStorage.getItem("id")).then((response) => {
      if (response.data.success) {
        setProjects(response.data.projects);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    });
  }, [navigate, searchQuery]);

  return (
    <div className="project_view">
      <div className="filter">
        <h3>Project</h3>
        <button className="filbtn">All</button>
        <button className="filbtn">OnGoing</button>
        <button className="filbtn">Completed</button>
      </div>
      <div className="add_seacrh">
        {Object.keys(permissions).length > 0 && permissions.project.add && (
          <button
            className="filbtn"
            onClick={() => {
              navigate("/company/projects/add");
            }}
          >
            Add Project
          </button>
        )}
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="projects_list">
        <div className="row">
          {projects &&
            !searchQuery &&
            projects.map((val) => {
              return (
                <div
                  key={val._id}
                  className="single_project col-12 col-md-3"
                  onClick={() => {
                    onProjectClick(val._id);
                  }}
                >
                  <div className="project_card">
                    <img
                      src={`http://localhost:9000/image/projects/${val.image}.jpg`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="project_des">
                      <label className="title">{val.project_name}</label>
                      <label className="location">{val.location}</label>
                      <label className="status">On Going</label>
                    </div>
                  </div>
                </div>
              );
            })}
          {searchQuery &&
            result &&
            result.map((val) => {
              return (
                <div
                  key={val._id}
                  className="single_project col-12 col-md-3"
                  onClick={() => {
                    onProjectClick(val._id);
                  }}
                >
                  <div className="project_card">
                    <img
                      src={`http://localhost:9000/image/projects/${val.image}.jpg`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="project_des">
                      <label className="title">{val.project_name}</label>
                      <label className="location">{val.location}</label>
                      <label className="status">On Going</label>
                    </div>
                  </div>
                </div>
              );
            })}
          {result.length === 0 && searchQuery !== "" && (
            <div className="single_project">
              <h1>No found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProjectView;

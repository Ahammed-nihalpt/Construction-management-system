import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyProjectView.css";
import { getAllProjects } from "../../../Helpers/config/axiosEndpoints";
import Swal from "sweetalert2";

function CompanyProjectView() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
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
    navigate("/company/projects/view", {
      state: {
        id: id,
      },
    });
  };

  useEffect(() => {
    getAllProjects()
      .then((response) => {
        if (response.data.success) {
          setProjects(response.data.data);
        }
        if (response.status === 401 || response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "401",
          text: "Error Unauthorized Access",
        }).then(() => {
          navigate("/company/login");
        });
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
        <button
          className="filbtn"
          onClick={() => {
            navigate("/company/projects/add");
          }}
        >
          Add Project
        </button>
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

export default CompanyProjectView;

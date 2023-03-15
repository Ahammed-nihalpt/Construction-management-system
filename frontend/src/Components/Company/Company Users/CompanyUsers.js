import React, { useEffect, useState } from "react";
import "./CompanyUsers.css";
import { useNavigate } from "react-router-dom";
import { getUserEndPoint } from "../../../Helpers/config/axiosEndpoints";

function CompanyUsers() {
  const nagvigate = useNavigate();
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value !== "") {
      const filteredUser = users.filter((value) =>
        value.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setResult(filteredUser);
    }
    console.log(result);
    console.log(searchQuery);
  };

  useEffect(() => {
    getUserEndPoint(localStorage.getItem("id")).then((response) => {
      const data = response.data.users.users;
      setUsers(data);
    });
  }, []);

  return (
    <div className="project_view">
      <div className="filter">
        <h3>User</h3>
      </div>
      <div className="add_seacrh">
        <div className="btns">
          <button
            className="filbtn"
            onClick={() => {
              nagvigate("/company/users/add");
            }}
          >
            Add Users
          </button>
          <button
            className="filbtn"
            onClick={() => {
              nagvigate("/company/users/desgination");
            }}
          >
            Add Designation
          </button>
        </div>

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
          {users &&
            !searchQuery &&
            users.map((value) => (
              <div
                className="single_project col-12 col-md-3"
                onClick={() =>
                  nagvigate("/company/users/view", {
                    state: {
                      id: value._id,
                    },
                  })
                }
              >
                <div className="project_card">
                  <img
                    src={`http://localhost:9000/image/user/${value.image}.jpg`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="project_des">
                    <label className="title">{value.name}</label>
                    <label className="location">{value.contact}</label>
                    <label className="location">Site Incharge</label>
                  </div>
                </div>
              </div>
            ))}

          {searchQuery &&
            result &&
            result.map((value) => {
              return (
                <div className="single_project col-12 col-md-3">
                  <div className="project_card">
                    <img
                      src={`http://localhost:9000/image/user/${value.image}.jpg`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="project_des">
                      <label className="title">{value.name}</label>
                      <label className="location">{value.contact}</label>
                      <label className="location">Site Incharge</label>
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

export default CompanyUsers;

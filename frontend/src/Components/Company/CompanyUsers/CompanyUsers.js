import React, { useEffect, useState } from "react";
import "./CompanyUsers.css";
import { useNavigate } from "react-router-dom";
import {
  getDesignationEndPoint,
  getUserEndPoint,
} from "../../../Helpers/config/axiosEndpoints";
import Swal from "sweetalert2";

function CompanyUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState([]);
  const [designations, setDesignations] = useState([]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value !== "") {
      const filteredUser = users.filter((value) =>
        value.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setResult(filteredUser);
    }
  };

  useEffect(() => {
    getUserEndPoint(localStorage.getItem("id"))
      .then((response) => {
        if (response.data.users) {
          const data = response.data.users.users;
          setUsers(data);
          getDesignationEndPoint(localStorage.getItem("id")).then(
            (response) => {
              if (response.data.success) {
                const doc = response.data.designation;

                setDesignations(doc);
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "401",
          text: "Error Unauthorized Access",
        }).then(() => {
          navigate("/");
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              navigate("/company/users/add");
            }}
          >
            Add Users
          </button>
          <button
            className="filbtn"
            onClick={() => {
              navigate("/company/users/desgination");
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
                  navigate("/company/users/view", {
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
                    {designations &&
                      designations.map((values) => (
                        <label className="location">
                          {values._id === value.designation_id
                            ? values.designation
                            : ""}
                        </label>
                      ))}
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

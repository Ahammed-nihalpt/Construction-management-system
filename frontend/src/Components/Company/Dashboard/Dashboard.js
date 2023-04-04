import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Legend } from "chart.js";
import Swal from "sweetalert2";
import {
  getAllProjects,
  getDesignationEndPoint,
  getUserEndPoint,
} from "../../../Helpers/config/axiosEndpoints";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [users, setUsers] = useState([]);
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Pending Project", "Compeleted Project"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#1B2433", "#2C4265"],
        hoverBackgroundColor: ["#1B2433", "#2C4265"],
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Fruit Distribution",
      fontSize: 20,
    },
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
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "400",
          text: "Error Unauthorized Access",
        }).then(() => {
          navigate("/");
        });
      });
    getUserEndPoint(localStorage.getItem("id"))
      .then((response) => {
        console.log(response);
        if (response.data.users) {
          const data = response.data.users.users;
          getDesignationEndPoint(localStorage.getItem("id")).then((res) => {
            const de = res.data.designation;
            setDesignations(de);
            setUsers(data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "400",
          text: "Error Unauthorized Access",
        }).then(() => {
          navigate("/");
        });
      });
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="chart_total">
        <div className="pichart">
          <Pie data={data} options={options} />
        </div>
        <div className="total_project">
          <label>Total Projects: </label>
          <label>{projects.length}</label>
        </div>
      </div>
      <div className="user_project">
        <div className="pulist">
          <div className="puhead">
            <label>Projects</label>
            <button onClick={() => navigate("/company/Projects")}>
              View All
            </button>
          </div>
          <div className="plist_table">
            {projects &&
              projects.length > 0 &&
              projects.map((project, index) => (
                <div key={project._id}>
                  <label>{index + 1}</label>
                  <label>{project.project_name}</label>
                  <label>{project.location}</label>
                </div>
              ))}
            {projects.length <= 0 && <label>No projects yet</label>}
          </div>
        </div>
        <div className="pulist">
          <div className="puhead">
            <label>Users</label>
            <button onClick={() => navigate("/company/users")}>View All</button>
          </div>
          <div className="plist_table">
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <div key={user._id}>
                  <label>{index + 1}</label>
                  <label>{user.name}</label>
                  {designations &&
                    designations.map(
                      (value) =>
                        value._id === user.designation_id && (
                          <label> {value.designation}</label>
                        )
                    )}
                </div>
              ))}
            {users && users.length <= 0 && <label>No user yet</label>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

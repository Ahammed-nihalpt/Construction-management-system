import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
import { Pie } from "react-chartjs-2";
import { ArcElement, Chart, Tooltip, Legend } from "chart.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getUserProjectsEndpoint } from "../../../Helpers/config/axiosUserEndpoins";

function UserDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Pending Project", "Compeleted Project"],
    datasets: [
      {
        data: [1, 0],
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
  }, []);

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
            <button onClick={() => navigate("/user/Projects")}>View All</button>
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
      </div>
    </div>
  );
}

export default UserDashboard;

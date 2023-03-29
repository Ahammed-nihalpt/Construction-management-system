import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getAllProjects,
  getDesignationEndPoint,
  getProjectPayment,
  getUserListEndpoint,
} from "../../../Helpers/config/axiosEndpoints";
import {
  generateProjectPDF,
  createExcelProjectFile,
  generateUsertPDF,
  createExcelUserFile,
} from "../../../Helpers/HelperFunctions/ReportFuntions";
import "./CompanyReports.css";

function CompanyReports() {
  const [projects, setProjects] = useState([]);
  const [role, setRole] = useState([]);

  useEffect(() => {
    getAllProjects().then((res) => {
      if (res.data.success) {
        setProjects(res.data.data);
      }
    });
    getDesignationEndPoint(localStorage.getItem("id")).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setRole(res.data.designation);
      }
    });
  }, []);

  const [roleInput, setRoleInput] = useState("");

  const handleChangeRole = (event) => {
    setRoleInput(event.target.value);
  };
  const [projectInput, setProjectInput] = useState({});

  const handleChangeProject = (event) => {
    setProjectInput(event.target.value);
  };

  const onProjectPdfClick = () => {
    getProjectPayment(projectInput._id).then((res) => {
      if (res.data.success) {
        generateProjectPDF(projectInput, res.data.data).download("my-data.pdf");
      }
    });
  };

  const onProjectExcelClick = () => {
    getProjectPayment(projectInput._id).then((res) => {
      if (res.data.success) {
        createExcelProjectFile(projectInput, res.data.data);
      }
    });
  };

  const onUserPDFClick = () => {
    getUserListEndpoint(localStorage.getItem("id"), roleInput).then((res) => {
      if (res.data.success) {
        generateUsertPDF(res.data.data).download("my-data.pdf");
      }
    });
  };

  const onUserExcelClick = () => {
    getUserListEndpoint(localStorage.getItem("id"), roleInput).then((res) => {
      if (res.data.success) {
        console.log(res);
        createExcelUserFile(res.data.data);
      }
    });
  };

  return (
    <div className="report">
      <h2>Reports</h2>
      <div className="report_list">
        <div className="project_report row gap-3">
          <h4 className="col-12">Project Report</h4>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Project</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={projectInput}
                label="Project"
                onChange={handleChangeProject}
              >
                {projects &&
                  projects.map((value) => (
                    <MenuItem value={value}>{value.project_name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="download_btn">
            <button onClick={onProjectPdfClick}>Download as PDF</button>
            <button onClick={onProjectExcelClick}>Download as Excel</button>
          </div>
        </div>
        <div className="project_report row gap-3">
          <h4 className="col-12">User List</h4>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                // id="demo-simple-select"
                value={roleInput}
                label="Role"
                onChange={handleChangeRole}
              >
                {role &&
                  role.map((value) => (
                    <MenuItem value={value._id}>{value.designation}</MenuItem>
                  ))}
                <MenuItem value="All">All</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="download_btn">
            <button onClick={onUserPDFClick}>Download as PDF</button>
            <button onClick={onUserExcelClick}>Download as Excel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyReports;

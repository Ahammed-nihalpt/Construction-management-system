import React, { useEffect, useState } from "react";
import { getSingleProject } from "../../../../Helpers/config/axiosEndpoints";
import { getSingleProjectUserEndpoint } from "../../../../Helpers/config/axiosUserEndpoins";
import "./ProjectDetails.css";

function ProjectDetails({ id, user }) {
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (user === "company") {
      getSingleProject(id).then((response) => {
        setDetails(response.data.data);
      });
    }

    if (user === "user") {
      getSingleProjectUserEndpoint(id).then((response) => {
        setDetails(response.data.data);
      });
    }
  }, [id, user]);

  return (
    <div className="full">
      <label className="head">Project Details</label>
      <div className="body row">
        <div className="left-body col-12 col-md-6">
          <label>Project Name: {details.project_name}</label>
          <label>Location: {details.location}</label>
          <label>Status: On Going</label>
          <label>Started On:{details.start_Date}</label>
          <label>Expected End Date: {details.end_Date}</label>
          <label>Tender Amount: {details.tender_amount}</label>
        </div>
        <div className="col-12 col-md-6">
          <label>Description: </label>
          <p>{details.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;

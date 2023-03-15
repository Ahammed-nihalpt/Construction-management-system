import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDesignationEndPoint } from "../../../Helpers/config/axiosEndpoints";
// import { AddProjectvalidate } from "../../../Helpers/Form Validation/AddProjectValidation";
import "./CompanyAddDesignation.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";

function CompanyAddDesignation() {
  const navigate = useNavigate();

  const intialValueCheck = {
    project: {
      view: { checked: false },
      edit: { checked: false },
      add: { checked: false },
    },
    user: {
      view: { checked: false },
      edit: { checked: false },
      add: { checked: false },
    },
    report: {
      view: { checked: false },
    },
  };

  const [formValues, setFormValues] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [formErrors, setFormErrors] = useState({});
  const [access, setAccess] = useState(intialValueCheck);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      addDesignationEndPoint(
        localStorage.getItem("id"),
        formValues.designation,
        access
      )
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            navigate("/company/users");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  function handleCheckboxChange(event) {
    console.log(event.target.checked);
    console.log(event.target.value);
    const { name, value, checked } = event.target;
    setAccess({
      ...access,
      [name]: {
        ...access[name],
        [value]: {
          ...access[name][value],
          checked,
        },
      },
    });
  }
  return (
    <div
      className="add_project"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div className="add_form">
        <div className="form_head">Designation</div>
        <div className="image"></div>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
          <div className="row g-2 justify-content-center">
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  name="designation"
                  value={formValues.name}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Designation</label>
              </div>
              <div className="error_div">{formErrors.Designation}</div>
            </div>
            <h5>Access:</h5>
            <div className="col-3">
              <label>Project</label>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="project"
                    value="view"
                  />
                }
                label="View"
                value=""
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="project"
                    value="add"
                  />
                }
                label="Add"
                value=""
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="user"
                    value="edit"
                  />
                }
                label="Edit"
                value=""
              />
            </div>
            <div className="col-3">
              <label>User</label>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="user"
                    value="view"
                  />
                }
                label="View"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="user"
                    value="add"
                  />
                }
                label="Add"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="user"
                    value="edit"
                  />
                }
                label="Edit"
              />
            </div>
            <div className="col-3">
              <label>Report</label>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckboxChange}
                    name="report"
                    value="view"
                  />
                }
                label="View"
              />
            </div>
            <div className="col-12">
              <button type="submit" class="btn btn-primary w-100">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanyAddDesignation;

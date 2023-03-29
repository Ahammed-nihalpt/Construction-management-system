import React, { useEffect, useState } from "react";
import {
  editProject,
  getDesignationEndPoint,
} from "../../../../Helpers/config/axiosEndpoints";
import { editProjectValidation } from "../../../../Helpers/FormValidation/AddProjectValidation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { blue } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AddData } from "../../../../Redux/Company/Action";
import { getUserDataEndpoint } from "../../../../Helpers/config/axiosUserEndpoins";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserEdit({ id }) {
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [designations, setDesignations] = useState([]);
  const intialValue = {
    name: "",
    contact: "",
    email: "",
    password: "",
    designation_id: "",
  };
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = useState(intialValue);
  const [edited, setEdited] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    console.log(id);
    getUserDataEndpoint(id).then((response) => {
      setFormValues(response.data.userData);
    });
    getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
      if (response.data.success) {
        const doc = response.data.designation;
        setDesignations(doc);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setEdited(true);
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
    }
    setFormErrors(editProjectValidation(formValues));
    const errors = editProjectValidation(formValues);
    if (Object.keys(errors).length === 0) {
      sendRequest();
      setEdited(false);
      dispatch(AddData(formValues));
    } else {
      setFormErrors(errors);
      setSuccess(true);
      setLoading(false);
    }
  };

  const sendRequest = () => {
    if (Object.keys(formErrors).length === 0) {
      editProject(formValues)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setSuccess(true);
            setLoading(false);
            setOpenSuccess(true);
          } else {
            setOpen(true);
          }
        })
        .catch((e) => {
          setOpen(true);
        });
    }
  };
  return (
    <div>
      <div className="edit_project">
        <div className="head">
          <label>Edit Project</label>
        </div>
        {formValues && (
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="row g-2 justify-content-center">
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Project Name"
                      name="name"
                      value={formValues.name}
                      onChange={handleChange}
                    />
                    <label for="floatingInputGrid">Name</label>
                  </div>
                  <div className="error_div">{formErrors.user_name}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Duration"
                      name="duration"
                      value={formValues.contact}
                      onChange={handleChange}
                    />
                    <label for="floatingInputGrid">Contact</label>
                  </div>
                  <div className="error_div">{formErrors.contact}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tender Amount"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <label for="floatingInputGrid">Email</label>
                  </div>
                  <div className="error_div">{formErrors.email}</div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <label for="floatingInputGrid">Password</label>
                  </div>
                  <div className="error_div">{formErrors.password}</div>
                </div>
                <div className="col-12">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      name="designation"
                      onChange={handleChange}
                    >
                      <option selected>Select desgination</option>
                      {designations &&
                        formValues &&
                        designations.map((value) => (
                          <option
                            key={value._id}
                            value={value._id}
                            selected={
                              value._id === formValues.designation_id
                                ? true
                                : false
                            }
                          >
                            {value.designation}
                          </option>
                        ))}
                    </select>
                    <label for="floatingSelect">Designation</label>
                  </div>
                  <div className="error_div">{formErrors.designation}</div>
                </div>
                <div className="col-2">
                  <Box sx={{ m: 0, position: "relative", width: "100%" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={buttonSx}
                      disabled={loading || edited === false}
                    >
                      Save
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: blue[500],
                          position: "relative",
                          left: "-50px",
                          top: "10px",
                        }}
                      />
                    )}
                  </Box>
                </div>
              </div>
            </form>
          </div>
        )}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Not updated some went wrong
          </Alert>
        </Snackbar>
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Project updated
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default UserEdit;

import React, { useEffect, useState } from "react";
import "./EditProject.css";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import {
  getSingleProject,
  editProject,
} from "../../../../Helpers/config/axiosEndpoints";
import { editProjectValidation } from "../../../../Helpers/Form Validation/AddProjectValidation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
// import Fab from "@mui/material/Fab";
import { blue } from "@mui/material/colors";
import { CircularProgress } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AddData } from "../../../../Redux/Company/Action";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditProject({ id }) {
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const intialValue = {
    project_name: "",
    duration: "",
    tender_amount: "",
    location: "",
    start_Date: "",
    end_Date: "",
    description: "",
  };
  const [open, setOpen] = React.useState(false);
  const [formValues, setFormValues] = useState(intialValue);
  const [edited, setEdited] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [Done, setDone] = useState(false);

  useEffect(() => {
    if (id) {
      getSingleProject(id).then((response) => {
        setFormValues(response.data.data);
      });
    }
  }, [id, Done]);

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

  // const handleButtonClick = () => {
  //   if (!loading) {
  //     setSuccess(false);
  //     setLoading(true);
  //     timer.current = window.setTimeout(() => {
  //       setSuccess(true);
  //       setLoading(false);
  //     }, 2000);
  //   }
  // };

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
      editProject(formValues, id)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setSuccess(true);
            setLoading(false);
            setDone(true);
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
    <div className="edit_project">
      <div className="head">
        <label>Edit Project</label>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="row g-2 justify-content-center">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  name="project_name"
                  value={formValues.project_name}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Project Name</label>
              </div>
              <div className="error_div">{formErrors.project_name}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Duration"
                  name="duration"
                  value={formValues.duration}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Duration</label>
              </div>
              <div className="error_div">{formErrors.duration}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tender Amount"
                  name="tender_amount"
                  value={formValues.tender_amount}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Tender Amount</label>
              </div>
              <div className="error_div">{formErrors.tender_amount}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="row justify-content-start align-items-center">
                <div className="col-9">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      name="location"
                      value={formValues.location}
                      onChange={handleChange}
                    />
                    <label for="floatingInputGrid">Location</label>
                  </div>
                </div>
                <button className="col-2 locbtn">
                  <LocationOnSharpIcon />
                </button>
              </div>
              <div className="error_div">{formErrors.location}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Start Date"
                  name="start_Date"
                  value={formValues.start_Date}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">Start Date</label>
              </div>
              <div className="error_div">{formErrors.start_Date}</div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="date"
                  className="form-control"
                  placeholder="End Date"
                  name="end_Date"
                  value={formValues.end_Date}
                  onChange={handleChange}
                />
                <label for="floatingInputGrid">End Date</label>
              </div>
              <div className="error_div">{formErrors.end_Date}</div>
            </div>
            <div className="col-12">
              <div class="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Project description"
                  id="floatingTextarea2"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                  style={{ height: "100px" }}
                ></textarea>
                <label for="floatingTextarea2">Description</label>
              </div>
              <div className="error_div">{formErrors.description}</div>
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
  );
}

export default EditProject;

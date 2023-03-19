import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Autocomplete, Box, TextField } from "@mui/material";
import { getUserProjectsEndpoint } from "../../../Helpers/config/axiosUserEndpoins";
import { payValidation } from "../../../Helpers/Form Validation/PaymentValidation";

function UserPayment() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [projects, setProjects] = useState("");
  const intialValue = {
    for: "",
    pid: "",
    amount: "",
  };
  useEffect(() => {
    getUserProjectsEndpoint(localStorage.getItem("id")).then((response) => {
      const projectData = response.data.projects;
      setProjects(projectData);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = payValidation(formValues, value);
    setFormErrors(errors);
  };
  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [value, setValue] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="all_progress">
      <div className="all_progress_heading">
        <h2>Payments</h2>
        <button className="pregress_btn" onClick={handleOpen}>
          Make a payment request
        </button>
      </div>
      <div className="progress_section row">
        <div className="col-12">
          <table className="table table-striped mt-2">
            <thead>
              <tr className="text-center">
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Project</th>
                <th scope="col">Payment for</th>
                <th scope="col">status</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <th scope="row">1</th>
                <td>sadf</td>
                <td>asdf</td>
                <td>asdfas</td>
                <td>asdfas</td>
                <td className="opstly">
                  <button className="pregress_btn">Cancel</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        disableEnforceFocus
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row p-3 offset-1">
            <h2 className="mb-2">Make payment request</h2>
            <form className="row justify-content-center">
              <div className="col-12 mb-1">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={projects}
                  getOptionLabel={(option) => option.project_name}
                  sx={{ width: "100%" }}
                  onChange={(e, values) => {
                    setValue(values._id);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select project" />
                  )}
                />
                <div className="error_div">{formErrors.pid}</div>
              </div>

              <div className="col-12 mb-1">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Amount"
                    name="amount"
                    value={formValues.amount}
                    onChange={handleChange}
                  />
                  <label>Amount</label>
                </div>
                <div className="error_div">{formErrors.amount}</div>
              </div>
              <div className="col-12 mb-1">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Payment for"
                    name="for"
                    value={formValues.for}
                    onChange={handleChange}
                  />
                  <label>Payment for</label>
                </div>
                <div className="error_div">{formErrors.for}</div>
              </div>
            </form>
            <div className="col-12 mt-2 d-flex justify-content-center">
              <button className="pregress_btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UserPayment;

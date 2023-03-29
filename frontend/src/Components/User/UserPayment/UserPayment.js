import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Autocomplete, Box, TextField } from "@mui/material";
import {
  addPaymentRequestEndpoint,
  getUserPaymentHistoryEndpoint,
  getUserProjectsEndpoint,
  userCancelPaymentEndpoint,
} from "../../../Helpers/config/axiosUserEndpoins";
import { toast } from "react-toastify";
import { payValidation } from "../../../Helpers/FormValidation/PaymentValidation";
import Swal from "sweetalert2";

function UserPayment() {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [projects, setProjects] = useState("");
  const [cancel, setCancel] = useState(true);
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
    getUserPaymentHistoryEndpoint(localStorage.getItem("id")).then(
      (response) => {
        if (response.data.success) {
          const sortedPayments = response.data.payments;
          setPayments(sortedPayments);
        }
      }
    );
  }, [open, cancel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = payValidation(formValues, value);
    setFormErrors(errors);
    if (Object.keys(errors).length <= 0) {
      addPaymentRequestEndpoint(
        formValues,
        value,
        localStorage.getItem("id")
      ).then((response) => {
        if (response.data.success) {
          handleClose();
          toast.success("Payment requested successfully");
        }
      });
    }
  };

  const onCancelClick = (payId) => {
    Swal.fire({
      title: "Are sure you want to cancel the request?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "yes",
      // denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        userCancelPaymentEndpoint(payId).then((response) => {
          if (response.data.success) {
            toast.success("Payment requested cancelled");
            if (cancel) {
              setCancel(false);
            } else {
              setCancel(true);
            }
          }
        });
      }
    });
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
              {payments &&
                payments.map((value) => (
                  <tr className="text-center">
                    <th scope="row">{`${new Date(value.date).getDate()}-${
                      new Date(value.date).getMonth() + 1
                    }-${new Date(value.date).getFullYear()}`}</th>
                    <td>{value.amount}</td>
                    <td>{value.projects[0].project_name}</td>
                    <td>{value.payment_for}</td>
                    <td>{value.status}</td>
                    <td className="opstly">
                      {value.status === "Pending" ? (
                        <button
                          className="pregress_btn"
                          onClick={() => {
                            onCancelClick(value._id);
                          }}
                        >
                          Cancel
                        </button>
                      ) : value.status === "Cancelled" ? (
                        "Request cancelled"
                      ) : value.status === "Rejected" ? (
                        "Payment rejected"
                      ) : value.status === "Confirmed" ? (
                        "Payment confirmed"
                      ) : value.status === "Paid" ? (
                        "Payment made"
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
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

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  changePaymentStatus,
  getAllPaymentsEndpoint,
  onlinePayEndpoint,
  verifyPaymentEndpoint,
} from "../../../Helpers/config/axiosEndpoints";
import useRazorpay from "react-razorpay";
import { RAZOR_ID } from "../../../Keys";
// import Swal from "sweetalert2";
// import { payValidation } from "../../../Helpers/Form Validation/PaymentValidation";

function CompanyAllPayments() {
  const Razorpay = useRazorpay();
  const [payments, setPayments] = useState([]);
  const [render, setRender] = useState(true);
  useEffect(() => {
    getAllPaymentsEndpoint(localStorage.getItem("id")).then((response) => {
      if (response.data.success) {
        const data = response.data.payments;
        setPayments(data);
      } else {
        toast.error("Something went wrong try again");
      }
    });
  }, [render]);

  const onClickOnlinePay = (id, amount) => {
    onlinePayEndpoint(id, amount).then((response) => {
      console.log(response.data);
      const options = {
        key: RAZOR_ID,
        amount: response.data.order.amount,
        currency: "INR",
        name: "CPMS",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: response.data.order.id,
        handler: function (response) {
          verifyPayment(response, id);
        },
        prefill: {
          name: "CPMS",
          email: "CPMSt@gmail.com",
          contact: "9879877892",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    });
  };

  const verifyPayment = (values, id) => {
    verifyPaymentEndpoint(id, values).then((response) => {
      if (response.data.success) {
        toast.success("Payment successfully");
      } else {
        toast.error("Payment failed");
      }
      if (render) {
        setRender(false);
      } else {
        setRender(true);
      }
    });
  };

  const changeStatusHandle = (id, value) => {
    changePaymentStatus(id, value).then((response) => {
      if (response.data.success) {
        toast.success("Status changed");
      } else {
        toast.error("something went wrong");
      }
      if (render) {
        setRender(false);
      } else {
        setRender(true);
      }
    });
  };

  return (
    <div className="all_progress">
      <div className="all_progress_heading">
        <h2>Payments</h2>
      </div>
      <div className="progress_section row">
        <div className="col-12">
          <table className="table table-striped mt-2">
            <thead>
              <tr className="text-center">
                <th scope="col">Date</th>
                <th scope="col">Project</th>
                <th scope="col">From</th>
                <th scope="col">Amount</th>
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
                    <td>{value.project[0].project_name}</td>
                    <td>{value.user_info[0].matched_user.name}</td>
                    <td>{value.amount}</td>
                    <td>{value.payment_for}</td>
                    <td>{value.status}</td>
                    <td className="opstly">
                      {value.status === "Pending" ? (
                        <button
                          className="pregress_btn"
                          onClick={() => {
                            changeStatusHandle(value._id, "Rejected");
                          }}
                        >
                          Reject
                        </button>
                      ) : (
                        ""
                      )}
                      {value.status === "Pending" ? (
                        <button
                          className="pregress_btn"
                          onClick={() => {
                            changeStatusHandle(value._id, "Confirmed");
                          }}
                        >
                          Confirm
                        </button>
                      ) : value.status === "Cancelled" ? (
                        "Cancelled by user"
                      ) : value.status === "Rejected" ? (
                        "Request rejected"
                      ) : value.status === "Paid" ? (
                        "Payment made"
                      ) : (
                        ""
                      )}

                      {value.status === "Confirmed" ? (
                        <button
                          className="pregress_btn"
                          onClick={() => {
                            onClickOnlinePay(value._id, value.amount);
                          }}
                        >
                          Pay online
                        </button>
                      ) : (
                        ""
                      )}
                      {value.status === "Confirmed" ? (
                        <button
                          className="pregress_btn"
                          onClick={() => {
                            changeStatusHandle(value._id, "Paid");
                          }}
                        >
                          Pay in hand
                        </button>
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
      {/* <Modal
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
        </Modal> */}
    </div>
  );
}

export default CompanyAllPayments;

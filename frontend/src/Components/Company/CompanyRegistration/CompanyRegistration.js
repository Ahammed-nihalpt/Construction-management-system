import React, { useState } from "react";
import "./CompanyRegistration.css";
import axios from "../../../Helpers/config/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import Swal from "sweetalert2";

function CompanyRegistration() {
  const navigate = useNavigate();
  const intialValue = {
    name: "",
    address: "",
    pincode: "",
    state: "",
    phone: "",
    gst: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const [loaderIs, setLoaderIs] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = validate(formValues);
    setFormErrors(er);
    if (Object.keys(er).length === 0) {
      setLoaderIs(true);
      axios({
        method: "post",
        url: "/company/registration",
        data: {
          name: formValues.name,
          address: formValues.address,
          pincode: formValues.pincode,
          state: formValues.state,
          phone: formValues.phone,
          gst: formValues.gst,
          email: formValues.email,
        },
      })
        .then((response) => {
          if (response.data.status === "success") {
            setLoaderIs(false);
            navigate("/company/otp", {
              state: {
                id: response.data.Company_id,
                email: response.data.email,
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            setLoaderIs(false);
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e.message,
          });
          setLoaderIs(false);
        });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
      errors.name = "Name should only contain alphabets";
    }
    if (!values.address) {
      errors.address = "address is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.address)) {
      errors.address = "Address should only contain alphabets";
    }
    if (!values.state) {
      errors.state = "state is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.state)) {
      errors.state = "state should only contain alphabets";
    }
    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (isNaN(Number(values.phone))) {
      errors.phone = "Invalid phone number";
    } else if (values.phone.length !== 10) {
      errors.phone = "Invalid phone number";
    }
    if (!values.pincode) {
      errors.pincode = "pincode is required";
    } else if (isNaN(Number(values.pincode))) {
      errors.pincode = "Invalid pincode";
    } else if (values.pincode.length !== 6) {
      errors.pincode = "Invalid pincode";
    }
    if (!values.gst) {
      errors.gst = "GST number is required";
    } else if (values.gst.length !== 15) {
      // console.log(values.pincode.length);
      errors.gst = "Invalid GST number";
    }
    if (!values.email) {
      errors.email = "email is required";
    } else if (
      !String(values.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  return (
    <div className="registration">
      {loaderIs && <Loader />}
      <div className="company_registration_div ">
        <div className="left">
          <div className="to_login">
            <div>
              <p>Already registered?</p>
              <button onClick={() => navigate("/company/login")}>Login</button>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="form">
            <div className="head">
              <p>Company Registration</p>
            </div>
            <div className="row justify-content-center">
              <form
                className="row justify-content-center"
                onSubmit={handleSubmit}
              >
                <div className="row g-2 justify-content-center">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.name
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">Company Name</label>
                    </div>
                    <div className="error_div">{formErrors.name}</div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.address
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Address"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">Office Address</label>
                    </div>
                    <div className="error_div">{formErrors.address}</div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.pincode
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Pincode"
                        name="pincode"
                        value={formValues.pincode}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">Pincode</label>
                    </div>
                    <div className="error_div">{formErrors.pincode}</div>
                  </div>
                  <div className="col-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.state
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="State"
                        name="state"
                        value={formValues.state}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">State</label>
                    </div>
                    <div className="error_div">{formErrors.state}</div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.phone
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">Phone</label>
                    </div>
                    <div className="error_div">{formErrors.phone}</div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.gst
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="GST"
                        name="gst"
                        value={formValues.gst}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">GST Number</label>
                    </div>
                    <div className="error_div">{formErrors.gst}</div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className={
                          !formErrors.email
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                      <label for="floatingInputGrid">Email</label>
                    </div>
                    <div className="error_div">{formErrors.email}</div>
                  </div>
                  <div className="col-12">
                    <button type="submit" class="btn btn-primary w-100">
                      Submit
                    </button>
                  </div>
                  <h6 className="gobackhome" onClick={() => navigate("/")}>
                    Go back to Home
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyRegistration;

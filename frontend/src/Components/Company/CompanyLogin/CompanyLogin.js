import React, { useState } from "react";
import axios from "../../../Helpers/config/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./CompanyLogin.css";
import Swal from "sweetalert2";

function CompanyLogin() {
  const navigate = useNavigate();
  const intialValue = {
    cmpid: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      axios({
        method: "post",
        url: "/company/login",
        data: {
          cmpid: formValues.cmpid,
          password: formValues.password,
        },
      })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("type", "company");
            window.location = "/company/home";
            // navigate("/company/home");
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid Company ID or Password",
              text: "Company is not found",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.cmpid) {
      errors.cmpid = "Company id is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  return (
    <div className="login">
      <div className="company_login_div">
        <div className="right">
          <div className="form">
            <div className="head">
              <p>Company Login</p>
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
                          !formErrors.cmpid
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="Company ID"
                        name="cmpid"
                        onChange={handleChange}
                      />
                      <label>Company ID</label>
                    </div>
                    <div className="error_div">{formErrors.cmpid}</div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className={
                          !formErrors.password
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="password"
                        onChange={handleChange}
                        name="password"
                      />
                      <label>Password</label>
                    </div>
                    <div className="error_div">{formErrors.password}</div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="left">
          <div className="to_login">
            <div>
              <p>Not registered?</p>
              <button onClick={() => navigate("/company/signup")}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyLogin;

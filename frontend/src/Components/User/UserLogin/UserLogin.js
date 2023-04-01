import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userLoginEndPoint } from "../../../Helpers/config/axiosEndpoints";

function UserLogin() {
  const navigate = useNavigate();
  const intialValue = {
    cmpid: "",
    password: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = validate(formValues);
    setFormErrors(formError);
    if (Object.keys(formError).length === 0) {
      userLoginEndPoint(formValues.email, formValues.cmpid, formValues.password)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("cid", response.data.cid);
            window.location = "/user/home";
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid Login details",
              text: "User is not found",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Something went worng",
            text: "try again",
          });
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <p>User Login</p>
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
                        type="text"
                        className={
                          !formErrors.email
                            ? "form-control"
                            : "form-control error"
                        }
                        placeholder="email"
                        onChange={handleChange}
                        name="email"
                      />
                      <label>Email</label>
                    </div>
                    <div className="error_div">{formErrors.email}</div>
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
                  <h6 className="gobackhome" onClick={() => navigate("/")}>
                    Go back to Home
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="left">
          <div className="to_login"></div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

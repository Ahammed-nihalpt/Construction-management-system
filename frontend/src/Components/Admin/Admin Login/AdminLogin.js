import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { adminLoginEndpoint } from "../../../Helpers/config/axiosAdminEndpoints";

function AdminLogin() {
  const intialValue = {
    id: "",
    password: "",
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const [formValues, setFormValues] = useState(intialValue);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0) {
      adminLoginEndpoint(formValues.id, formValues.password)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            navigate("/admin/home");
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

    if (!values.id) {
      errors.id = "ID is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };
  return (
    <div>
      <div className="login">
        <div className="company_login_div">
          <div className="right">
            <div className="form">
              <div className="head">
                <p>Admin Login</p>
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
                            !formErrors.id
                              ? "form-control"
                              : "form-control error"
                          }
                          placeholder="Company ID"
                          name="id"
                          onChange={handleChange}
                        />
                        <label>Admin ID</label>
                      </div>
                      <div className="error_div">{formErrors.id}</div>
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
          <div className="left"></div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

import React, { useEffect, useState } from "react";
import "./CompanyPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../Helpers/config/axiosInstance";
import Swal from "sweetalert2";

function CompanyPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Password is empty");
    } else if (password.length < 8) {
      setError("Password must have at least 8 characters");
    } else {
      setError(null);
      axios({
        method: "post",
        url: "/company/setpassword",
        data: {
          id: location.state.id,
          password,
        },
      })
        .then((response) => {
          if (response.data.success) {
            navigate("/company/login");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios({
      method: "post",
      url: "/company/getCMPId",
      data: {
        id: location.state.id,
      },
    })
      .then((response) => {
        console.log(response);
        console.log("pppp");
        setCMPId(response.data.cmpid);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.state.id]);

  const [CMPId, setCMPId] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="setpass">
      <div className="company_setpass_div">
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
                        className="form-control disabled"
                        placeholder="Company ID"
                        value={CMPId}
                        disabled
                      />
                      <label>Company ID</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className={
                          !error ? "form-control" : "form-control error"
                        }
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label>Password</label>
                    </div>
                    <div className="error_div">{error}</div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                      Complete Registration
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
  );
}

export default CompanyPassword;

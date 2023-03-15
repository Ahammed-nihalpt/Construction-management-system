import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../Helpers/config/axiosInstance";
import "./otp.css";
// import Swal from "sweetalert2";
function Opt() {
  const navigate = useNavigate();
  const location = useLocation();
  const [remainingTime, setRemainingTime] = useState(60);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const resendOtp = () => {
    console.log("reached");
    axios({
      method: "post",
      url: "/company/resendOTP",
      data: {
        id: location.state.id,
        email: location.state.email,
      },
    }).then((response) => {});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otp) {
      setError("OTP is required");
    } else if (isNaN(otp)) {
      setError("Otp should only contain number");
    } else {
      axios({
        method: "post",
        url: "/company/verifyOTP",
        data: {
          otp,
          id: location.state.id,
          email: location.state.email,
        },
      }).then((response) => {
        if (response.data.success) {
          navigate("/company/setpassword", {
            state: {
              id: location.state.id,
            },
          });
        } else {
          setError("Entered otp does not match");
        }
      });
    }
  };

  useEffect(() => {
    let intervalId = null;
    if (remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [remainingTime]);

  return (
    <div>
      <div className="otp">
        <div className="company_otp_div">
          <div className="right">
            <div className="form">
              <div className="head">
                <p>OTP</p>
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
                            !error ? "form-control" : "form-control error"
                          }
                          placeholder="Company ID"
                          name="otp"
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value);
                          }}
                        />
                        <label>Enter OPT</label>
                      </div>
                      <div className="error_div">{error}</div>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary w-100">
                        confirm
                      </button>
                    </div>
                    <div className="col-12">
                      <button
                        className="resendotp"
                        onClick={resendOtp}
                        disabled={remainingTime > 0}
                      >
                        {remainingTime > 0
                          ? `Resend OTP in ${remainingTime}s`
                          : "Resend OTP"}
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

export default Opt;

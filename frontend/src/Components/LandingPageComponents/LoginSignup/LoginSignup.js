import React from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";

function LoginSignup({ myRef }) {
  const navigate = useNavigate();
  return (
    <div ref={myRef} className="login_signup row">
      <div className="login_side col-12">
        <button onClick={() => navigate("/company/login")}>
          Login As Company
        </button>
        <button onClick={() => navigate("/user/login")}>Login As User</button>
      </div>
    </div>
  );
}

export default LoginSignup;

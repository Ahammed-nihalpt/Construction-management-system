import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingNav.css";

function LandingNav({ executeScroll, bgColor }) {
  const navigate = useNavigate();

  return (
    <div className="landing_nav" style={{ backgroundColor: "black" }}>
      <div>
        <h1>CPMS</h1>
      </div>
      <div className="login_resgisert">
        <button
          className="btn_land"
          onClick={() => {
            navigate("/company/signup");
          }}
        >
          Register
        </button>
        <label>|</label>
        <button onClick={executeScroll} className="btn_land">
          Login
        </button>
      </div>
    </div>
  );
}

export default LandingNav;

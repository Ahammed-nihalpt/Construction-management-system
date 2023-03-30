import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingNav.css";

function LandingNav() {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navStyle = {
    backgroundColor: scrollPosition > 0 ? "#000" : "transparent",
  };
  return (
    <div className="landing_nav" style={navStyle}>
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
        <button className="btn_land">Login</button>
      </div>
    </div>
  );
}

export default LandingNav;

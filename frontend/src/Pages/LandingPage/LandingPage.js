import React from "react";
import LandingCarousel from "../../Components/LandingPageComponents/Carousel/LandingCarousel";
import Features from "../../Components/LandingPageComponents/Features/Features";
import LandingNav from "../../Components/LandingPageComponents/LandingNav/LandingNav";
import About from "../../Components/LandingPageComponents/LandingPageContent/About/About";
import LoginSignup from "../../Components/LandingPageComponents/LoginSignup/LoginSignup";

function LandingPage() {
  return (
    <div className="landing_page">
      <div className="animation-area">
        <ul className="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <LandingNav />
      <LandingCarousel />
      <About />
      <Features />
      <LoginSignup />
    </div>
  );
}

export default LandingPage;

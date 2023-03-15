import React from "react";
import LandingCarousel from "../../Components/Landing Page Components/Carousel/LandingCarousel";
import LandingNav from "../../Components/Landing Page Components/Landing Nav/LandingNav";
import About from "../../Components/Landing Page Components/Landing page content/About/About";

function LandingPage() {
  return (
    <div>
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
    </div>
  );
}

export default LandingPage;

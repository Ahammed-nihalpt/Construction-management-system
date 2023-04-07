import React, { useEffect, useRef, useState } from "react";
import LandingCarousel from "../../Components/LandingPageComponents/Carousel/LandingCarousel";
import Features from "../../Components/LandingPageComponents/Features/Features";
import LandingNav from "../../Components/LandingPageComponents/LandingNav/LandingNav";
import About from "../../Components/LandingPageComponents/LandingPageContent/About/About";
import LoginSignup from "../../Components/LandingPageComponents/LoginSignup/LoginSignup";

function LandingPage() {
  const myRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setBackgroundColor("lightblue");
      } else {
        setBackgroundColor("transparent");
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth" });

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
      <LandingNav executeScroll={executeScroll} bgColor={backgroundColor} />
      <LandingCarousel />
      <About />
      <Features />
      <LoginSignup myRef={myRef} />
    </div>
  );
}

export default LandingPage;

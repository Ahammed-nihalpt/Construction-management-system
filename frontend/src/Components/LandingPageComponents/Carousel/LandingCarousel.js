import React, { useEffect, useState } from "react";
import "./LandingCarousel.css";

const images = [
  {
    image: "https://www.cpms.site/backend/image/carousel/1.jpg",
    head: `Construction Project Management System`,
    text: "Collaborate, communicate, and conquer with our construction project management solution.",
  },
  {
    image: "https://www.cpms.site/backend/image/carousel/3.jpg",
    head: `Construction Project Management System`,
    text: "Collaborate, communicate, and conquer with our construction project management solution.",
  },
  {
    image: "https://www.cpms.site/backend/image/carousel/2.jpg",
    head: `Construction Project Management System`,
    text: "Collaborate, communicate, and conquer with our construction project management solution.",
  },
];

function LandingCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(interval);
    };
  }, [currentImageIndex]);
  return (
    <div>
      <div className="cr_image">
        <div
          className="cr_bg_image"
          style={{
            backgroundImage: `url(${images[currentImageIndex].image})`,
          }}
        >
          <div className="crBlackout"></div>

          <div
            className={`rectangle tracking-in-expand ${
              isVisible ? " vibrate-1" : ""
            }`}
          ></div>
          <div className="cr_text focus-in-contract-bck">
            <h1>{images[currentImageIndex].head}</h1>
            {images[currentImageIndex].text}
          </div>
        </div>
        {/* <img src={images[currentImageIndex].image} alt="" /> */}
      </div>
    </div>
  );
}

export default LandingCarousel;

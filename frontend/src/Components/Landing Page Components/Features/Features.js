import React, { useEffect, useRef, useState } from "react";
import "./Features.css";

function Features() {
  const [featureDis, setfeatureDis] = useState("");
  const [headingEffect, setheadingEffect] = useState(false);
  const targetRef = useRef(null);
  const featrueDetails = (value) => {
    setfeatureDis(value);
  };
  const onFeatureMouseLeave = () => {
    setfeatureDis("");
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setheadingEffect(true);
        } else {
          setheadingEffect(false);
        }
      });
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);
  return (
    <div className="features" ref={targetRef}>
      <div className="all_fe">
        <div
          className="single_features slide-in-bck-center"
          onMouseEnter={() => {
            featrueDetails("one");
          }}
          onMouseLeave={onFeatureMouseLeave}
        >
          <div className="feimage">
            <img
              src="http://localhost:9000/image/feature/fe 1.jpg"
              className={featureDis === "one" ? "less_bri kenburns-top" : ""}
              alt=""
            />
            Project Scheduling
            {featureDis === "one" && (
              <div className="fe_details slide-in-bottom">asdf</div>
            )}
          </div>
        </div>
        <div
          className="single_features slide-in-bck-center"
          onMouseEnter={() => {
            featrueDetails("two");
          }}
          onMouseLeave={onFeatureMouseLeave}
        >
          <div className="feimage">
            <img
              src="http://localhost:9000/image/feature/fe 1.jpg"
              className={featureDis !== "two" ? "" : "less_bri kenburns-top"}
              alt=""
            />
            {featureDis === "two" && (
              <div className="fe_details slide-in-bottom">asdf</div>
            )}
          </div>
        </div>
        <div
          className="single_features slide-in-bck-center"
          onMouseEnter={() => {
            featrueDetails("three");
          }}
          onMouseLeave={onFeatureMouseLeave}
        >
          <div className="feimage">
            <img
              src="http://localhost:9000/image/feature/fe 1.jpg"
              className={featureDis !== "three" ? "" : "less_bri kenburns-top"}
              alt=""
            />
            {featureDis === "three" && (
              <div className="fe_details slide-in-bottom">asdf</div>
            )}
          </div>
        </div>
      </div>
      <div className="fe_head">
        <h1 className={headingEffect ? "text-pop-up-top " : ""}>Features</h1>
      </div>
    </div>
  );
}

export default Features;

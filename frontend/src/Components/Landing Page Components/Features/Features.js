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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(targetRef.current);
      }
    };
  }, []);
  return (
    <div className="features">
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

            <label className={featureDis === "one" ? "im_head_opa" : "im_head"}>
              Project Scheduling
            </label>
            {featureDis === "one" && (
              <div className="fe_details slide-in-bottom">
                Project Scheduling <br /> Scheduling is a critical aspect of
                construction project management, and a good scheduling feature
                can help users to plan, organize, and track their projects
                effectively.We offer a simple method for scheduling your
                project, ensuring its timely completion.
              </div>
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
              src="http://localhost:9000/image/feature/fe2.png"
              className={featureDis === "three" ? "less_bri kenburns-top" : ""}
              alt=""
            />
            <label
              className={featureDis === "three" ? "im_head_opa" : "im_head"}
            >
              Reporting & Analytics
            </label>
            {featureDis === "three" && (
              <div className="fe_details slide-in-bottom">
                Reporting & Analytics <br />
                Reporting and analytics are crucial for construction project
                management, and a good reporting and analytics feature can
                provide users with valuable insights into their projects'
                progress, performance, and risks. We offer an automated report
                on each of your projects.
              </div>
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
              src="http://localhost:9000/image/feature/fe3.jpg"
              className={featureDis === "two" ? "less_bri kenburns-top" : ""}
              alt=""
            />
            <label className={featureDis === "two" ? "im_head_opa" : "im_head"}>
              Project Control
            </label>

            {featureDis === "two" && (
              <div className="fe_details slide-in-bottom">
                Project Control <br />
                It is critical to understand what is happening in the project at
                each step because a mistake can result in significant time,
                money, and other losses in the project, so we are providing a
                solution for this issue, by using our site Company can see what
                is happening in all the project at a single point.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fe_head">
        <h1 className={headingEffect ? "text-pop-up-top " : ""} ref={targetRef}>
          Features
        </h1>
      </div>
    </div>
  );
}

export default Features;

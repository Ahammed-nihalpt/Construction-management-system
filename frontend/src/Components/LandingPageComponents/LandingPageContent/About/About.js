import React from "react";
import "./About.css";

function About() {
  return (
    <div className="landing_about">
      <div className="aboutcontent">
        <h1 className="focus-in-expand-fwd mt-5">About</h1>
        <div className="about_main">
          <div className=" about_image">
            <img
              src="https://www.cpms.site/backend/static/image/aboutimg.jpg"
              alt=""
            />
          </div>
          <div className="about_text">
            <h4>A Vision of Better Building.</h4>
            <p style={{ color: "#000" }}>
              With our system, you'll have all the tools you need to manage
              schedules, budgets, tasks, resources, and more in one centralized
              platform. Our user-friendly interface and intuitive features make
              it easy to collaborate, communicate, and conquer your construction
              projects. From project scheduling and budget tracking to task
              management and document storage, our system empowers you to take
              control and achieve success. Whether you're a contractor, builder,
              or construction company, our solution is the perfect tool for
              streamlining your construction projects and ensuring that you stay
              on track and on budget. Get started today and see the difference
              for yourself
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

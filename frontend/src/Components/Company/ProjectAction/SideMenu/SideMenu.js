import React, { useEffect, useState } from "react";
import "./SideMenu.css";
import {
  companyAction,
  companyUserAction,
  userProjectAction,
} from "./SideMenuData";
import { useNavigate } from "react-router-dom";

function SideMenu({ id, type, user }) {
  const naviagte = useNavigate();
  const [values, setValues] = useState([]);
  useEffect(() => {
    if (user === "company") {
      if (type === "project") {
        setValues(companyAction);
      } else if (type === "user") {
        setValues(companyUserAction);
      }
    } else if (user === "user") {
      if (type === "project") {
        setValues(userProjectAction);
      }
    }
  }, [type, user]);

  return (
    <div className="project_sidemenu">
      <div className="action">
        {values.map((value) => {
          return (
            <div
              key={value.title}
              className="option"
              onClick={() => {
                naviagte(value.link, { state: { id: id } });
              }}
            >
              {value.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideMenu;

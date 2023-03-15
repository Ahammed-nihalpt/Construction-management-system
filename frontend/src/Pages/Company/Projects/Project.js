import { useSelector } from "react-redux";
import CompanyAddProject from "../../../Components/Company/Company Add Project/CompanyAddProject";
import CompanyProjectView from "../../../Components/Company/Company project view/CompanyProjectView";
import SingleProjectView from "../../../Components/Company/Compnay single project view/SingleProjectView";
import Sidebar from "../../../Components/Sidebar/sidebar";
import Topnav from "../../../Components/Topnav/Topnav";
import "./Project.css";

function Project({ type, action }) {
  // eslint-disable-next-line no-unused-vars
  return (
    <div>
      <div className="project">
        <div className="side_nav">
          <Sidebar type="company" />
        </div>
        <div
          className={
            !useSelector((state) => {
              return state.toggle;
            })
              ? "home_left"
              : "home_left_mod"
          }
        >
          <div className="top_nav">
            <Topnav />
          </div>
          {type === "view" && (
            <div>
              <CompanyProjectView />
            </div>
          )}
          {type === "add" && (
            <div>
              <CompanyAddProject />
            </div>
          )}

          {type === "single" && (
            <div>
              <SingleProjectView action={action} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project;

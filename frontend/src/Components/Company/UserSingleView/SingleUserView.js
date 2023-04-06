import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserDetails from "../CompanyUserAction/UserDetails/UserDetails";
import SideMenu from "../ProjectAction/SideMenu/SideMenu";
import { AddData } from "../../../Redux/Company/Action";
import {
  getUserEndPoint,
  getDesignationEndPoint,
} from "../../../Helpers/config/axiosEndpoints";
import { Image_URL } from "../../../Keys";
import { useDispatch, useSelector } from "react-redux";
import UserEdit from "../CompanyUserAction/UserEdit/UserEdit";

function SingleUserView({ action }) {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({});
  const [designations, setDesignations] = useState([]);
  const value = useSelector((state) => state.data);
  useEffect(() => {
    if (state.id) {
      getUserEndPoint(localStorage.getItem("id")).then((response) => {
        const data = response.data.users.users;
        const filter = data.find((obj) => obj._id === state.id);
        dispatch(AddData(filter));
        setUserDetails(filter);
        getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
          if (response.data.success) {
            const doc = response.data.designation;
            const filterd = doc.find(
              (obj) => obj._id === filter.designation_id
            );
            setDesignations(filterd);
          }
        });
      });
    } else {
      setUserDetails(value);
      getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
        if (response.data.success) {
          const doc = response.data.designation;
          const filterd = doc.find((obj) => obj._id === value.designation_id);
          setDesignations(filterd);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="single_project_view">
        {userDetails && (
          <div className="profile">
            <div className="project_image col-md-6">
              <div className="img">
                <img
                  src={`${Image_URL}/image/user/${userDetails.image}.jpg`}
                  alt="..."
                ></img>
              </div>
            </div>
            <div className="project_details col-md-6">
              <div className="details">
                <label>Name: {userDetails.name}</label>
                <label>Contact: {userDetails.contact}</label>
                {designations && (
                  <label>Role: {designations.designation}</label>
                )}
              </div>
            </div>
          </div>
        )}
        {userDetails && (
          <div className="action row">
            <div className="left_option col-3">
              <SideMenu id={state.id} type="user" user="company" />
            </div>
            {action === "details" && (
              <div className="right_option col-9">
                <UserDetails id={state.id} />
              </div>
            )}
            {action === "edit" && (
              <div className="right_option col-9">
                <UserEdit id={state.id} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleUserView;

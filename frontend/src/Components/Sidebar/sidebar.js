import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom";
import {
  adminSideData,
  comapnySidebarData,
  userSidebarData,
} from "./Sidebardata";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "../../Helpers/config/axiosInstance";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useDispatch, useSelector } from "react-redux";
import {
  Addpermission,
  ClickedAction,
  ToggleAction,
} from "../../Redux/Company/Action";
import { Image_URL } from "../../Keys";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import {
  getPermissionEndpoint,
  getUserDataEndpoint,
} from "../../Helpers/config/axiosUserEndpoins";
import EditIcon from "@mui/icons-material/Edit";
import { editCompanyImg } from "../../Helpers/config/axiosEndpoints";

function Sidebar({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [details, setDetails] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [clicked, setClicked] = useState(
    useSelector((state) => {
      return state.clicked;
    })
  );
  // eslint-disable-next-line no-unused-vars
  const [permission, setPermission] = useState();
  const [userDatas, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const formData = new FormData();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(URL.createObjectURL(file));
    formData.append("image", file);
    editCompanyImg(formData, localStorage.getItem("id"));
  };

  useEffect(() => {
    if (type === "company") {
      axios
        .get(`/company/get/${localStorage.getItem("id")}`, { headers })
        .then((response) => {
          if (response.data.success) {
            const det = response.data.data;
            setDetails(det);
          }
        });
    }
    if (type === "user") {
      getUserDataEndpoint(localStorage.getItem("id")).then((response) => {
        if (response.data.success) {
          const datas = response.data.userData;
          setUserData(datas);
          getPermissionEndpoint(response.data.userData.designation_id).then(
            (res) => {
              const per = res.data.doc;
              setPermission(per);
              dispatch(Addpermission(per));
            }
          );
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [toggle, setToggle] = useState(
    useSelector((state) => {
      return state.toggle;
    })
  );
  if (toggle) {
    return (
      <div className="sidebar">
        <div className="side_head">
          <h3>Menu</h3>
          <div className="left toggle_btn close_icon">
            <h3
              onClick={() => {
                dispatch(ToggleAction(false));
                if (toggle) {
                  setToggle(false);
                } else {
                  setToggle(true);
                }
              }}
            >
              <CloseSharpIcon />
            </h3>
          </div>
        </div>
        <div className="profile">
          {userDatas && type === "user" && (
            <div
              className="img"
              style={{
                backgroundImage: `url("${Image_URL}/image/user/${userDatas.image}.jpg")`,
              }}
            ></div>
          )}
          {details && type === "company" && (
            <div
              className={!isEditing ? "img" : "img fivebr"}
              style={
                details.image
                  ? {
                      backgroundImage: `url(${
                        newImage
                          ? newImage
                          : `${Image_URL}/image/company/${details.image}.jpg`
                      })`,
                    }
                  : {
                      backgroundImage: `url(${
                        newImage ? newImage : `${Image_URL}/image/onimage.jpg`
                      })`,
                    }
              }
              onMouseEnter={() => setIsEditing(true)}
              onMouseLeave={() => {
                setIsEditing(false);
              }}
            >
              {isEditing && (
                <div className="innerEdit">
                  <label htmlFor="file-upload">
                    Edit Image
                    <EditIcon />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
          )}
          {type === "admin" && (
            <div
              className="img"
              style={{
                backgroundImage: `url("${Image_URL}/image/onimage.jpg")`,
              }}
            ></div>
          )}
          {!userDatas && type === "user" && (
            <div
              className="img"
              style={{
                backgroundImage: `url("${Image_URL}/image/user/${userDatas.image}.jpg")`,
              }}
            ></div>
          )}
          <div className="cmp_name">
            {details && type === "company" ? details.company_name : ""}
            {userDatas && type === "user" ? userDatas.name : ""}
            {!userDatas && !details && "Admin"}
          </div>
        </div>
        <p className="main_text">Main</p>
        <ul className="sidebarList">
          {type === "company" &&
            comapnySidebarData.map((val, key) => {
              return (
                <li
                  className={clicked === val.title ? "rows clicked" : "rows"}
                  key={key}
                  onClick={() => {
                    dispatch(ClickedAction(val.title));
                    navigate(val.link);
                  }}
                >
                  <div>{val.icon}</div>
                  <div>{val.title}</div>
                </li>
              );
            })}
          {type === "user" &&
            userSidebarData.map((val, key) => {
              return (
                <li
                  className={clicked === val.title ? "rows clicked" : "rows"}
                  key={key}
                  onClick={() => {
                    dispatch(ClickedAction(val.title));
                    navigate(val.link);
                  }}
                >
                  <div>{val.icon}</div>
                  <div>{val.title}</div>
                </li>
              );
            })}
          {type === "admin" &&
            adminSideData.map((val, key) => {
              return (
                <li
                  className={clicked === val.title ? "rows clicked" : "rows"}
                  key={key}
                  onClick={() => {
                    dispatch(ClickedAction(val.title));
                    navigate(val.link);
                  }}
                >
                  <div>{val.icon}</div>
                  <div>{val.title}</div>
                </li>
              );
            })}
          <li
            className="rows"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <div>
              <LogoutSharpIcon />
            </div>
            <div>Logout</div>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="sidebar_min">
        <div className="min_head toggle_btn">
          <h3
            onClick={() => {
              dispatch(ToggleAction(true));

              if (toggle) {
                setToggle(false);
              } else {
                setToggle(true);
              }
            }}
          >
            <MenuIcon />
          </h3>
        </div>
        <ul className="sidebarList">
          {comapnySidebarData.map((val, key) => {
            return (
              <li
                className={
                  clicked === val.title ? "rows_min clicked" : "rows_min"
                }
                onClick={() => {
                  dispatch(ClickedAction(val.title));
                  navigate(val.link);
                }}
                key={key}
              >
                <div>{val.icon}</div>
              </li>
            );
          })}
          <li
            className="rows_min"
            onClick={() => {
              localStorage.clear();
              navigate("/company/login");
            }}
          >
            <div>
              <LogoutSharpIcon />
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;

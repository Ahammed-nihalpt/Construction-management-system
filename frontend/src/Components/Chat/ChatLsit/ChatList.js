import React, { useEffect, useState } from "react";
import "./ChatList.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  getDesignationEndPoint,
  getUserEndPoint,
} from "../../../Helpers/config/axiosEndpoints";
import {
  getAllChatUsers,
  getChatDesignation,
  clearUnreadUser,
} from "../../../Helpers/config/axiosUserEndpoins";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ChatList(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [desgination, setDesgination] = useState([]);
  const [unread, setUnread] = useState([]);
  useEffect(() => {
    if (props.account === "company") {
      getUserEndPoint(localStorage.getItem("id")).then((response) => {
        const data = response.data.users.users;
        getDesignationEndPoint(localStorage.getItem("id")).then((res) => {
          const de = res.data.designation;
          setDesgination(de);
          setUserData(data);
        });
      });
    } else if (props.account === "user") {
      getAllChatUsers(localStorage.getItem("cid"), localStorage.getItem("id"))
        .then((res) => {
          if (res.data.success) {
            const data = res.data.data[0].users;
            const count = res.data.unread;
            getChatDesignation(localStorage.getItem("cid")).then((resp) => {
              if (resp.data.success) {
                const de = resp.data.designation;
                setDesgination(de);
                setUserData(data);
                setUnread(count);
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Opps!!!",
              text: "Something went wrong",
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Opps!!!",
            text: "Something went wrong",
          }).then(() => {
            navigate("/admin/login");
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnUserClick = (id) => {
    clearUnreadUser(id, localStorage.getItem("id"));
    props.onClickUpdate(id);
  };

  return (
    <div className="chatlist">
      <div className="chat_search">
        <input type="text" placeholder="Search" />
        <button>
          <SearchIcon />
        </button>
      </div>
      <div className="All_chat row">
        {userData &&
          desgination &&
          userData.map((value) => (
            <div
              className="single_chat col-12"
              key={value._id}
              onClick={() => {
                handleOnUserClick(value._id);
              }}
            >
              <div>
                <img
                  src={`http://localhost:9000/image/user/${value.image}.jpg`}
                  alt="asdf"
                />
              </div>
              <div>
                <label className="user_details">{value.name}</label>
                {desgination.map((des) => (
                  <label className="user_details">
                    {des._id === value.designation_id ? des.designation : ""}
                  </label>
                ))}
              </div>
              <div>
                {unread.map((read) =>
                  read.sender === value._id && read.unreadMessages !== 0 ? (
                    <label>{read.unreadMessages}</label>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatList;

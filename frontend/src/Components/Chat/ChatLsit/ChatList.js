import React, { useEffect, useState } from "react";
import "./ChatList.css";
import SearchIcon from "@mui/icons-material/Search";
import {
  getDesignationEndPoint,
  getUserEndPoint,
} from "../../../Helpers/config/axiosEndpoints";

function ChatList(props) {
  const [userData, setUserData] = useState([]);
  const [desgination, setDesgination] = useState([]);
  useEffect(() => {
    getUserEndPoint(localStorage.getItem("id")).then((response) => {
      const data = response.data.users.users;
      console.log(data);
      getDesignationEndPoint(localStorage.getItem("id")).then((res) => {
        const de = res.data.designation;
        setDesgination(de);
        setUserData(data);
      });
    });
  }, []);

  const handleOnUserClick = (id) => {
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
              onClick={() => handleOnUserClick(value._id)}
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default ChatList;

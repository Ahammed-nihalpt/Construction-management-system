import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./MessageSide.css";
import SendIcon from "@mui/icons-material/Send";
import {
  getDesignationEndPoint,
  getUserEndPoint,
} from "../../../Helpers/config/axiosEndpoints";
import {
  getChatDesignation,
  getChatHistoryUser,
  getUserDataEndpoint,
} from "../../../Helpers/config/axiosUserEndpoins";
import SingleMessage from "../Single Message/SingleMessage";

function MessageSide({ id, account }) {
  const [sendMsg, setSnedMsg] = useState();
  const [inputValue, setInputValue] = useState("");
  const socket = io("http://localhost:9000");
  const [user, setUser] = useState({});
  const [Designation, setDesignation] = useState();
  useEffect(() => {
    if (id) {
      getChatHistoryUser(localStorage.getItem("id"), id).then((respon) => {
        const smsg = respon.data.sndMessage;
        const rmsg = respon.data.receiveMessage;
        const msg = [...smsg, ...rmsg];
        console.log(msg);
        setSnedMsg([...smsg, ...rmsg]);
      });
    }

    if (account === "company") {
      getUserEndPoint(localStorage.getItem("id")).then((response) => {
        const data = response.data.users.users;
        const filter = data.find((obj) => obj._id === id);
        setUser(filter);
        getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
          if (response.data.success) {
            const doc = response.data.designation;
            const filterd = doc.find(
              (obj) => obj._id === filter.designation_id
            );
            setDesignation(filterd);
          }
        });
      });
    } else if (account === "user") {
      getUserDataEndpoint(id).then((res) => {
        if (res.data.success) {
          const filter = res.data.userData;
          setUser(filter);
          getChatDesignation(localStorage.getItem("cid")).then((resp) => {
            if (resp.data.success) {
              const doc = resp.data.designation;
              const filterd = doc.find(
                (obj) => obj._id === filter.designation_id
              );
              setDesignation(filterd);
            }
          });
        }
      });
    }

    socket.on("chat message", (msg) => {
      setSnedMsg((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    setSnedMsg((prevMessages) => [...prevMessages, inputValue]);
    socket.emit("chat message", inputValue, id, localStorage.getItem("id"));
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="messageside">
      <div className="ms_head">
        {id && user && (
          <img
            src={`http://localhost:9000/image/user/${user.image}.jpg`}
            alt=""
          />
        )}
        <div>
          <label className="user_details">{user && user.name}</label>
          <label className="user_details">
            {Designation && Designation.designation}
          </label>
        </div>
      </div>
      <div className="ms_body">
        <div class="chat__message chat__message-own">
          <div class="date"></div>
          {id && <SingleMessage messages={sendMsg} currentUserId={id} />}
          {!id && <h4>Select a user</h4>}
        </div>
      </div>
      <div className="ms_foot">
        <div className="ms_snd_input">
          <form className="ms_snd_input" onSubmit={handleFormSubmit}>
            <input
              disabled={id ? false : true}
              type="text"
              placeholder="Type a message ....."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit" disabled={id ? false : true}>
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageSide;

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./MessageSide.css";
import SendIcon from "@mui/icons-material/Send";
import {
  getDesignationEndPoint,
  getUserEndPoint,
} from "../../../Helpers/config/axiosEndpoints";

function MessageSide({ id }) {
  const [messages, setMessages] = useState([]);
  const [previous, setPrevious] = useState();
  const [inputValue, setInputValue] = useState("");
  const socket = io("http://localhost:9000");
  const [user, setUser] = useState({});
  const [Designation, setDesignation] = useState();
  useEffect(() => {
    getUserEndPoint(localStorage.getItem("id")).then((response) => {
      const data = response.data.users.users;
      const filter = data.find((obj) => obj._id === id);
      setUser(filter);
      getDesignationEndPoint(localStorage.getItem("id")).then((response) => {
        if (response.data.success) {
          const doc = response.data.designation;
          const filterd = doc.find((obj) => obj._id === filter.designation_id);
          setDesignation(filterd);
        }
      });
    });
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    // Emit a new message
    socket.emit("chat message", inputValue, id, localStorage.getItem("id"));
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="messageside">
      <div className="ms_head">
        {user && (
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
          <div>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="ms_foot">
        <div className="ms_snd_input">
          <form className="ms_snd_input" onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Type a message ....."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MessageSide;

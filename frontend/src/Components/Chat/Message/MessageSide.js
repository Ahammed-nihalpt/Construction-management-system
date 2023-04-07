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
import { Image_URL } from "../../../Keys";
import SingleMessage from "../SingleMessage/SingleMessage";

function MessageSide({ id, account }) {
  const [sendMsg, setSnedMsg] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState({});
  const [Designation, setDesignation] = useState();
  const [socketConnect, setSocketConnect] = useState();
  useEffect(() => {
    const socket = io("https://cpms.site", {
      query: {
        userId: localStorage.getItem("id"),
      },
    });
    setSocketConnect(socket);
    if (id) {
      setSnedMsg([]);
      getChatHistoryUser(localStorage.getItem("id"), id).then((respon) => {
        if (
          respon.data.sndMessage.length > 0 &&
          respon.data.receiveMessage.length <= 0
        ) {
          const smsg = respon.data.sndMessage[0].message;
          const filsndmsg = smsg.map((msg) => ({ ...msg, sender: true }));
          setSnedMsg(filsndmsg);
        } else if (
          respon.data.sndMessage.length <= 0 &&
          respon.data.receiveMessage.length > 0
        ) {
          const rmsg = respon.data.receiveMessage[0].message;
          const filremsg = rmsg.map((msg) => ({ ...msg, sender: false }));
          setSnedMsg(filremsg);
        } else {
          const smsg = respon.data.sndMessage[0].message;
          const rmsg = respon.data.receiveMessage[0].message;
          const filsndmsg = smsg.map((msg) => ({ ...msg, sender: true }));
          const filremsg = rmsg.map((msg) => ({ ...msg, sender: false }));
          const msg = filremsg.concat(filsndmsg);
          setSnedMsg(msg);
        }
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

    socket.on("chat-message", (msg, date) => {
      setSnedMsg((prevMessages) => [
        ...prevMessages,
        { date, content: msg.msg, sender: false },
      ]);
    });
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    setSnedMsg((prevMessages) => [
      ...prevMessages,
      { date: Date.now(), content: inputValue, sender: true },
    ]);
    socketConnect.emit(
      "chat-message",
      inputValue,
      id,
      localStorage.getItem("id"),
      Date.now
    );
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="messageside">
      <div className="ms_head">
        {id && user && (
          <img src={`${Image_URL}/image/user/${user.image}.jpg`} alt="" />
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
          {id && sendMsg && (
            <SingleMessage messages={sendMsg} currentUserId={id} />
          )}
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

import React, { useState } from "react";
import ChatList from "../../Components/Chat/ChatLsit/ChatList";
import ChatNav from "../../Components/Chat/ChatNav/ChatNav";
import MessageSide from "../../Components/Chat/Message/MessageSide";
import "./Chat.css";

function Chat() {
  const [data, setData] = useState();
  const handleDataChange = (id) => {
    setData(id);
  };
  return (
    <div className=" w-100 h-100 chat_main">
      <div
        className="re"
        style={{
          backgroundColor: "#000",
          height: "100%",
        }}
      >
        <div>
          <ChatNav />
        </div>
        <div className="row" style={{ height: "calc(100% - 50px)" }}>
          <div className="col-4 col-md-3" style={{ position: "relative" }}>
            <ChatList onClickUpdate={handleDataChange} />
          </div>
          <div className="col-8 col-md-9">
            <MessageSide id={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

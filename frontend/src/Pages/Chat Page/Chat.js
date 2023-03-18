import React from "react";
import ChatNav from "../../Components/Chat/ChatNav/ChatNav";

function Chat() {
  return (
    <div className="p-4 w-100 h-100" style={{ backgroundColor: "#555" }}>
      <div className="w-100 h-100" style={{ backgroundColor: "#000" }}>
        <ChatNav />
      </div>
    </div>
  );
}

export default Chat;

import React from "react";
import "./ChatNav.css";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";

function ChatNav() {
  const navigate = useNavigate();
  return (
    <div className="chat_nav">
      <div className="chat_nav_head">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <KeyboardBackspaceSharpIcon />
        </button>
        <h2>Message</h2>
      </div>
    </div>
  );
}

export default ChatNav;

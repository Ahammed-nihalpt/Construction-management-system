import React from "react";
import moment from "moment";
import "./SingleMessage.css";

const SentMessage = ({ message }) => {
  return (
    <div className="sent-message">
      <div className="message-content">{message.content}</div>
      <div className="message-time">
        {moment(message.date).format("h:mm A")}
      </div>
    </div>
  );
};

const ReceivedMessage = ({ message }) => {
  return (
    <div className="received-message">
      <div className="message-content">{message.content}</div>
      <div className="message-time">
        {moment(message.date).format("h:mm A")}
      </div>
    </div>
  );
};

const SingleMessage = ({ messages, currentUserId }) => {
  return (
    <div className="chat">
      {messages.map((message) => {
        if (message.sender === currentUserId) {
          return (
            <SentMessage key={message.message._id} message={message.message} />
          );
        } else {
          return (
            <ReceivedMessage key={message._id} message={message.message} />
          );
        }
      })}
    </div>
  );
};

export default SingleMessage;

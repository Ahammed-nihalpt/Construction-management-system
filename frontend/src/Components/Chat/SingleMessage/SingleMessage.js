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
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  return (
    <div className="chat">
      {messages &&
        sortedMessages.map((message) => {
          if (message.sender) {
            return <SentMessage key={message._id} message={message} />;
          } else {
            return <ReceivedMessage key={message._id} message={message} />;
          }
        })}
    </div>
  );
};

export default SingleMessage;

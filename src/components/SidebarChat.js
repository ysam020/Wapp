import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import moment from "moment";

function SidebarChat({ name, email, photoURL, lastMessage, time }) {
  const navigate = useNavigate();

  // Navigate to chat page
  const goToUser = (emailId) => {
    if (emailId) {
      navigate(`/${emailId}`);
    }
  };

  return (
    <div className="sidebar-chat-item" onClick={() => goToUser(email)}>
      <Avatar src={photoURL} />
      <div className="sidebar-chat-info">
        <div className="sidebar-chat-info-row-1">
          <h3>{name}</h3>
          <p>{moment(time.toDate().toGMTString("en-US")).fromNow()}</p>
        </div>
        <div className="sidebar-chat-info-row-2">
          {lastMessage && <p>{lastMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default SidebarChat;

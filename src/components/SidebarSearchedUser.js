import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";

function SidebarSearchedUser({ name, email, photoURL, lastMessage }) {
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
        </div>
      </div>
    </div>
  );
}

export default SidebarSearchedUser;

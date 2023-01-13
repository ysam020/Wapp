import React from "react";
import { Avatar } from "@material-ui/core";

function SidebarSearchedUser({
  name,
  email,
  photoURL,
  setSearchInput,
  about,
  setChat,
  setEmailId,
}) {
  return (
    <div
      className="sidebar-chat-item"
      onClick={() => {
        setChat(true);
        setEmailId(email);
        localStorage.setItem("chat", JSON.stringify(email));
        setSearchInput("");
      }}
    >
      <Avatar src={photoURL} />
      <div className="sidebar-chat-info">
        <div className="sidebar-chat-info-row-1">
          <h3>{name}</h3>
        </div>
        <div className="sidebar-chat-info-row-2">
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SidebarSearchedUser);

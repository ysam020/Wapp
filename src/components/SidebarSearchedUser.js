import React from "react";
// Components
import { Avatar } from "@material-ui/core";

///////////////////////////////////////////////////////////////////
function SidebarSearchedUser(props) {
  return (
    <div
      className="sidebar-chat-item"
      onClick={() => {
        props.setChat(true);
        props.setChatUser(props.user);
        localStorage.setItem("chat", JSON.stringify(props.user));
        props.setSearchInput("");
      }}
    >
      <Avatar src={props.photoURL} alt={props.name} />
      <div className="sidebar-chat-info">
        <div className="sidebar-chat-info-row-1">
          <h3>{props.name}</h3>
        </div>
        <div className="sidebar-chat-info-row-2">
          <p>{props.about}</p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SidebarSearchedUser);

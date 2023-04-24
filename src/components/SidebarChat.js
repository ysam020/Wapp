import React from "react";
// Components
import { Avatar } from "@material-ui/core";
import * as Icons from "./Icons";
import Tooltip from "@mui/material/Tooltip";

///////////////////////////////////////////////////////////////////
function SidebarChat(props) {
  // Classify timestamp based on time ago
  const getTimeAgo = () => {
    const currentDate = new Date();

    if (props.time !== null) {
      const messageDate = props.time.toDate();

      const midNightTime = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        0,
        0,
        0
      );

      const diffTime = currentDate - messageDate;
      const elapsedTime = (messageDate - midNightTime) / (1000 * 60 * 60);
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (elapsedTime > 0 && elapsedTime < 24) {
        return messageDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (diffDays < 2) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return messageDate.toLocaleString("default", { weekday: "long" });
      } else {
        return messageDate.toLocaleDateString();
      }
    }
  };

  return (
    <>
      <Tooltip
        title={props.lastMessage || props.messageType}
        placement="right"
        enterDelay={500}
        enterNextDelay={500}
        arrow
      >
        <div
          className="sidebar-chat-item"
          onClick={() => {
            localStorage.setItem("chat", JSON.stringify(props.friend));
            props.setChat(true);
            props.setChatUser(props.friend);
          }}
        >
          <Avatar src={props.photoURL} alt={props.name} />
          <div className="sidebar-chat-info">
            <div className="sidebar-chat-info-row-1">
              <h3>{props.name}</h3>
              {getTimeAgo() && <p>{getTimeAgo()}</p>}
            </div>
            <div className="sidebar-chat-info-row-2">
              {props.typingIndicator && props.typingIndicator === true ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <p className="typing-indicator">typing...</p>
                </div>
              ) : props.messageType === "Photo" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {props.messageSent === true ? (
                    <Icons.DoneAllIcon
                      color={props.messageRead ? "info" : "primary"}
                      style={{ marginRight: "5px", width: "18px" }}
                    />
                  ) : (
                    ""
                  )}
                  <Icons.PhotoCameraIcon
                    color="primary"
                    sx={{ width: "15px", marginRight: "5px" }}
                  />
                  <p>Photo</p>
                </div>
              ) : props.messageType === "Gif" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {props.messageSent === true ? (
                    <Icons.DoneAllIcon
                      color={props.messageRead ? "info" : "primary"}
                      style={{ marginRight: "5px", width: "18px" }}
                    />
                  ) : (
                    ""
                  )}
                  <Icons.GifBoxIcon
                    color="primary"
                    sx={{ width: "15px", marginRight: "5px" }}
                  />
                  <p>Gif</p>
                </div>
              ) : props.messageType === "Video" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {props.messageSent === true ? (
                    <Icons.DoneAllIcon
                      color={props.messageRead ? "info" : "primary"}
                      style={{ marginRight: "5px", width: "18px" }}
                    />
                  ) : (
                    ""
                  )}
                  <Icons.VideoCameraBackIcon
                    color="primary"
                    sx={{ width: "15px", marginRight: "5px" }}
                  />
                  <p>Video</p>
                </div>
              ) : props.messageType === "Document" ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {props.messageSent === true ? (
                    <Icons.DoneAllIcon
                      color={props.messageRead ? "info" : "primary"}
                      style={{ marginRight: "5px", width: "18px" }}
                    />
                  ) : (
                    ""
                  )}
                  <Icons.InsertDriveFileIcon
                    color="primary"
                    sx={{ width: "15px", marginRight: "5px" }}
                  />
                  <p>Document</p>
                </div>
              ) : props.lastMessage ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {props.messageSent === true ? (
                    <Icons.DoneAllIcon
                      color={props.messageRead ? "info" : "primary"}
                      style={{ marginRight: "5px", width: "18px" }}
                    />
                  ) : (
                    ""
                  )}
                  <p>{props.lastMessage}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
}

export default React.memo(SidebarChat);

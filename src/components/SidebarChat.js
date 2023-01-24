import React from "react";
import { Avatar } from "@material-ui/core";
import moment from "moment";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import GifBoxIcon from "@mui/icons-material/GifBox";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Tooltip from "@mui/material/Tooltip";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    sidebarChatIcon: {
      width: "15px !important",
      color: "#8696A0",
      marginRight: "5px",
    },
    unreadIcon: {
      width: "20px !important",
      color: "#8696A0",
      marginRight: "5px",
    },
    readIcon: {
      width: "20px !important",
      color: "#53bdeb",
      marginRight: "5px",
    },
    downIcon: { color: "#8696A0" },
  })
);

function SidebarChat(props) {
  // MUI Styles
  const classes = useStyles();

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
            props.setChat(true);
            props.setEmailId(props.email);
            localStorage.setItem("chat", JSON.stringify(props.email));
          }}
        >
          <Avatar src={props.photoURL} />
          <div className="sidebar-chat-info">
            <div className="sidebar-chat-info-row-1">
              <h3>{props.name}</h3>
              <p>
                {moment(props.time.toDate().toGMTString("en-US")).fromNow()}
              </p>
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
                    <DoneAllIcon
                      className={
                        props.messageRead === false
                          ? classes.unreadIcon
                          : classes.readIcon
                      }
                    />
                  ) : (
                    ""
                  )}
                  <PhotoCameraIcon className={classes.sidebarChatIcon} />
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
                    <DoneAllIcon
                      className={
                        props.messageRead === false
                          ? classes.unreadIcon
                          : classes.readIcon
                      }
                    />
                  ) : (
                    ""
                  )}
                  <GifBoxIcon className={classes.sidebarChatIcon} />
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
                    <DoneAllIcon
                      className={
                        props.messageRead === false
                          ? classes.unreadIcon
                          : classes.readIcon
                      }
                    />
                  ) : (
                    ""
                  )}
                  <VideoCameraBackIcon className={classes.sidebarChatIcon} />
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
                    <DoneAllIcon
                      className={
                        props.messageRead === false
                          ? classes.unreadIcon
                          : classes.readIcon
                      }
                    />
                  ) : (
                    ""
                  )}
                  <InsertDriveFileIcon className={classes.sidebarChatIcon} />
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
                    <DoneAllIcon
                      className={
                        props.messageRead === false
                          ? classes.unreadIcon
                          : classes.readIcon
                      }
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

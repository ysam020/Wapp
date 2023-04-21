import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as Icons from "../Icons";
import useContexts from "../../customHooks/contexts";
import { urlPattern } from "../../assets/data/urlPattern";
import { downloadMedia } from "../../utils/downloadMedia";

const useStyles = makeStyles((theme) =>
  createStyles({
    unreadIcon: {
      width: "20px !important",
      color: "#8696A0",
    },
    readIcon: {
      width: "20px !important",
      color: "#53bdeb",
    },
    starIcon: { width: "20px !important", color: "#8696A0" },
    fileIcon: {
      width: "50px !important",
      height: "40px !important",
      color: "#7A8F9B",
    },
    downloadIcon: {
      width: "20px !important",
      height: "20px !important",
      color: "#7A8F9B",
      border: "1px solid #7A8F9B",
      borderRadius: "50%",
      padding: "5px",
    },
  })
);

function ChatMessage(props) {
  // MUI Styles
  const classes = useStyles();

  // Context
  const { currentUser } = useContexts();

  return (
    <>
      <div
        className={
          props.sender === currentUser.email
            ? "chat-message chat-message-sent"
            : "chat-message chat-message-received"
        }
      >
        {props.message.match(urlPattern) ? (
          <>
            <div className="message-text">
              <a href={props.message} target="blank">
                {props.message}
              </a>
            </div>
          </>
        ) : props.imageURL ? (
          <>
            <div
              className="message-text"
              onClick={() => downloadMedia(props.imageURL, props.fileName)}
              id="downloadPhoto"
              style={{ cursor: "pointer" }}
            >
              <img alt="img" src={props.imageURL} />
            </div>
          </>
        ) : props.videoURL ? (
          <>
            <div className="message-text">
              <video
                src={props.videoURL}
                controls={true}
                height="auto"
                style={{ outline: "none", cursor: "pointer" }}
                onClick={() => downloadMedia(props.videoURL, props.fileName)}
                id="downloadVideo"
              ></video>
            </div>
          </>
        ) : props.fileURL ? (
          <>
            <div
              className="message-text-document"
              onClick={() => downloadMedia(props.fileURL, props.fileName)}
              id="downloadFile"
              style={{ cursor: "pointer" }}
            >
              <div className="file-container">
                <div className="file-inner-container">
                  <Icons.InsertDriveFileIcon className={classes.fileIcon} />
                  <p>{props.fileName}</p>
                  <Icons.FileDownloadIcon className={classes.downloadIcon} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="message-text">
              <p>{props.message}</p>
            </div>
          </>
        )}
        <span className="chat-timestamp">
          {props.starredMessage === true && (
            <Icons.StarRateRoundedIcon className={classes.starIcon} />
          )}
          <p>
            {new Date(props.time.toDate()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {props.sender === currentUser.email && (
            <Icons.DoneAllIcon
              className={
                props.sender === currentUser.email && props.read === true
                  ? `${classes.readIcon} delivered-icon`
                  : props.sender === currentUser.email
                  ? `${classes.unreadIcon} delivered-icon`
                  : ""
              }
            />
          )}
        </span>
      </div>
    </>
  );
}

export default React.memo(ChatMessage);

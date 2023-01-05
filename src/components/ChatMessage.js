import React from "react";
import { auth } from "../firebase";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

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

function ChatMessage({
  message,
  time,
  sender,
  read,
  imageURL,
  videoURL,
  fileURL,
  fileName,
}) {
  // MUI Styles
  const classes = useStyles();

  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator

  return (
    <>
      <div
        className={
          sender === auth?.currentUser?.email
            ? "chat-message chat-message-sent"
            : "chat-message chat-message-received"
        }
      >
        {message.match(urlPattern) ? (
          <>
            <div className="message-text">
              <a href={message} target="blank">
                {message}
              </a>
            </div>
            <span className="chat-timestamp">
              <p>{new Date(time.toDate()).toLocaleTimeString()}</p>
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? `${classes.readIcon}`
                      : sender === auth?.currentUser.email
                      ? `${classes.unreadIcon}`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : imageURL ? (
          <>
            <div className="message-text">
              <a href={imageURL} target="_blank" rel="noreferrer" download>
                <img src={imageURL} width={300} alt="img" />
              </a>
            </div>
            <span className="chat-timestamp">
              <p>{new Date(time.toDate()).toLocaleTimeString()}</p>
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? `${classes.readIcon} media-delivered-icon`
                      : sender === auth?.currentUser.email
                      ? `${classes.unreadIcon} media-delivered-icon`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : videoURL ? (
          <>
            <div className="message-text">
              <video
                src={videoURL}
                controls={true}
                width={300}
                style={{ outline: "none" }}
              ></video>
            </div>
            <span className="chat-timestamp">
              <p>{new Date(time.toDate()).toLocaleTimeString()}</p>
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? `${classes.readIcon} media-delivered-icon`
                      : sender === auth?.currentUser.email
                      ? `${classes.unreadIcon} media-delivered-icon`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : fileURL ? (
          <>
            <div className="message-text-document">
              <div className="file-container">
                <a href={fileURL} target="_blank" rel="noreferrer" download>
                  <div className="file-inner-container">
                    <InsertDriveFileIcon className={classes.fileIcon} />
                    <p>{fileName}</p>
                    <FileDownloadIcon className={classes.downloadIcon} />
                  </div>
                </a>
              </div>
            </div>
            <span className="chat-timestamp">
              <p>{new Date(time.toDate()).toLocaleTimeString()}</p>
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? `${classes.readIcon} delivered-icon`
                      : sender === auth?.currentUser.email
                      ? `${classes.unreadIcon} delivered-icon`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : (
          <>
            <div className="message-text">
              <p>{message}</p>
            </div>
            <span className="chat-timestamp">
              <p>{new Date(time.toDate()).toLocaleTimeString()}</p>
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? `${classes.readIcon} delivered-icon`
                      : sender === auth?.currentUser.email
                      ? `${classes.unreadIcon} delivered-icon`
                      : ""
                  }
                />
              )}
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default React.memo(ChatMessage);

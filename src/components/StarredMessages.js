import React, { useContext, useState, useEffect } from "react";
import "../styles/starred-messages.css";
import { StarredMessageContext, UserContext } from "../contexts/Context";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { Avatar, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import db from "../firebase";

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
    avatarIcon: {
      height: "30px",
      width: "30px",
    },
    icon: { color: "#8696A0" },
  })
);

function StarredMessages(props) {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const starredMessageContext = useContext(StarredMessageContext);
  const currentUser = useContext(UserContext);

  //   useState
  const [chatUser, setChatUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      db.collection("users")
        .doc(props.emailId)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
    };

    getUser();
  });

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
      <div className="sidebar-panel-right">
        <div className="sidebar-panel-right-header">
          <IconButton
            className={classes.icon}
            onClick={() =>
              starredMessageContext.starredMessageDispatch("toggle")
            }
          >
            <CloseRoundedIcon />
          </IconButton>
          <h3>Starred messages</h3>
        </div>

        <div className="starred-messages-body">
          {props.starredMessages.map((message, id) => {
            return (
              <div key={id} className="starred-message">
                <div className="starred-message-row-1">
                  <Avatar
                    src={
                      message.data().senderEmail === chatUser.email
                        ? chatUser.photoURL
                        : currentUser.photoURL
                    }
                    className={classes.avatarIcon}
                  />
                  <p>
                    {message.data().senderEmail} <ArrowRightRoundedIcon />
                    {message.data().receiverEmail}
                  </p>
                </div>
                <div className="starred-message-row-2">
                  {" "}
                  <div
                    className={
                      message.data().senderEmail === auth?.currentUser?.email
                        ? "chat-message chat-message-sent"
                        : "chat-message chat-message-received"
                    }
                  >
                    {message.data().text.match(urlPattern) ? (
                      <>
                        <div className="message-text">
                          <a href={message.text} target="blank">
                            {message.text}
                          </a>
                        </div>
                        <span className="chat-timestamp">
                          <p>
                            {new Date(
                              message.data().timestamp.toDate()
                            ).toLocaleTimeString()}
                          </p>
                          {message.data().senderEmail ===
                            auth?.currentUser.email && (
                            <DoneAllIcon
                              className={
                                message.data().senderEmail ===
                                  auth?.currentUser.email &&
                                message.data().raed === true
                                  ? `${classes.readIcon}`
                                  : message.data().senderEmail ===
                                    auth?.currentUser.email
                                  ? `${classes.unreadIcon}`
                                  : ""
                              }
                            />
                          )}
                        </span>
                      </>
                    ) : message.data().imageURL ? (
                      <>
                        <div className="message-text">
                          <a
                            href={message.data().imageURL}
                            target="_blank"
                            rel="noreferrer"
                            download
                          >
                            <img
                              src={message.data().imageURL}
                              width={300}
                              alt="img"
                            />
                          </a>
                        </div>
                        <span className="chat-timestamp">
                          <p>
                            {new Date(
                              message.data().timestamp.toDate()
                            ).toLocaleTimeString()}
                          </p>
                          {message.data().senderEmail ===
                            auth?.currentUser.email && (
                            <DoneAllIcon
                              className={
                                message.data().senderEmail ===
                                  auth?.currentUser.email &&
                                message.data().raed === true
                                  ? `${classes.readIcon} media-delivered-icon`
                                  : message.data().senderEmail ===
                                    auth?.currentUser.email
                                  ? `${classes.unreadIcon} media-delivered-icon`
                                  : ""
                              }
                            />
                          )}
                        </span>
                      </>
                    ) : message.data().videoURL ? (
                      <>
                        <div className="message-text">
                          <video
                            src={message.data().videoURL}
                            controls={true}
                            width={300}
                            style={{ outline: "none" }}
                          ></video>
                        </div>
                        <span className="chat-timestamp">
                          <p>
                            {new Date(
                              message.data().timestamp.toDate()
                            ).toLocaleTimeString()}
                          </p>
                          {message.data().senderEmail ===
                            auth?.currentUser.email && (
                            <DoneAllIcon
                              className={
                                message.data().senderEmail ===
                                  auth?.currentUser.email &&
                                message.data().raed === true
                                  ? `${classes.readIcon} media-delivered-icon`
                                  : message.data().senderEmail ===
                                    auth?.currentUser.email
                                  ? `${classes.unreadIcon} media-delivered-icon`
                                  : ""
                              }
                            />
                          )}
                        </span>
                      </>
                    ) : message.data().fileURL ? (
                      <>
                        <div className="message-text-document">
                          <div className="file-container">
                            <a
                              href={message.data().fileURL}
                              target="_blank"
                              rel="noreferrer"
                              download
                            >
                              <div className="file-inner-container">
                                <InsertDriveFileIcon
                                  className={classes.fileIcon}
                                />
                                <p>{message.data().fileName}</p>
                                <FileDownloadIcon
                                  className={classes.downloadIcon}
                                />
                              </div>
                            </a>
                          </div>
                        </div>
                        <span className="chat-timestamp">
                          <p>
                            {new Date(
                              message.data().timestamp.toDate()
                            ).toLocaleTimeString()}
                          </p>
                          {message.data().senderEmail ===
                            auth?.currentUser.email && (
                            <DoneAllIcon
                              className={
                                message.data().senderEmail ===
                                  auth?.currentUser.email &&
                                message.data().raed === true
                                  ? `${classes.readIcon} delivered-icon`
                                  : message.data().senderEmail ===
                                    auth?.currentUser.email
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
                          <p>{message.data().text}</p>
                        </div>
                        <span className="chat-timestamp">
                          <p>
                            {new Date(
                              message.data().timestamp.toDate()
                            ).toLocaleTimeString()}
                          </p>
                          {message.data().senderEmail ===
                            auth?.currentUser.email && (
                            <DoneAllIcon
                              className={
                                message.data().senderEmail ===
                                  auth?.currentUser.email &&
                                message.data().raed === true
                                  ? `${classes.readIcon} delivered-icon`
                                  : message.data().senderEmail ===
                                    auth?.currentUser.email
                                  ? `${classes.unreadIcon} delivered-icon`
                                  : ""
                              }
                            />
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default React.memo(StarredMessages);

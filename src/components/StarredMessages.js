import React, { useState, useEffect, useCallback } from "react";
import "../styles/starred-messages.css";
import { Avatar, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase";
import * as Icons from "./Icons";
import db from "../firebase";
import useContexts from "../customHooks/contexts";
import { urlPattern } from "../assets/data/urlPattern";

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
  const { currentUser, emailId, starredMessageDispatch } = useContexts();

  //   useState
  const [chatUser, setChatUser] = useState({});

  var userCollectionref = db.collection("users");

  const getUser = useCallback(() => {
    userCollectionref.doc(emailId).onSnapshot((snapshot) => {
      setChatUser(snapshot.data());
    });
    // eslint-disable-next-line
  }, [chatUser]);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="sidebar-panel-right">
        <div className="sidebar-panel-right-header">
          <IconButton
            aria-label="close"
            className={classes.icon}
            onClick={() => starredMessageDispatch("hide")}
          >
            <Icons.CloseRoundedIcon />
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
                    alt={
                      message.data().senderEmail === chatUser.email
                        ? chatUser.photoURL
                        : currentUser.photoURL
                    }
                  />
                  <p>
                    {message.data().senderEmail} <Icons.ArrowRightRoundedIcon />
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
                            <Icons.DoneAllIcon
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
                            <Icons.DoneAllIcon
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
                            <Icons.DoneAllIcon
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
                                <Icons.InsertDriveFileIcon />
                                <p>{message.data().fileName}</p>
                                <Icons.FileDownloadIcon />
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
                            <Icons.DoneAllIcon
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
                            <Icons.DoneAllIcon
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

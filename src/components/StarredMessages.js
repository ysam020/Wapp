import React from "react";
import { auth } from "../firebase";
// Styles
import "../styles/starred-messages.css";
// Components
import * as Icons from "./Icons";
import { Avatar, IconButton } from "@material-ui/core";
// Assets
import { urlPattern } from "../assets/data/urlPattern";
// Custom hooks
import useContexts from "../customHooks/contexts";
import useChatUser from "../customHooks/chatUser";

///////////////////////////////////////////////////////////////////
function StarredMessages(props) {
  // Custom hooks
  const { currentUser } = useContexts();
  const { chatUser } = useChatUser();

  // Filter starred messages for current user
  const starredMessages = props.starredMessages.filter((message) => {
    return (
      (message.data().receiverEmail === currentUser.email ||
        message.data().senderEmail === currentUser.email) &&
      (message.data().receiverEmail === chatUser.email ||
        message.data().senderEmail === chatUser.email)
    );
  });

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          aria-label="close"
          onClick={props.toggleDrawer("starredMessages", false)}
        >
          <Icons.CloseRoundedIcon color="primary" />
        </IconButton>
        <h3>Starred messages</h3>
      </div>

      <div className="starred-messages-body">
        {starredMessages.map((message, id) => {
          return (
            <div key={id} className="starred-message">
              <div className="starred-message-row-1">
                <Avatar
                  src={
                    message.data().senderEmail === chatUser.email
                      ? chatUser.photoURL
                      : currentUser.photoURL
                  }
                  style={{ height: "30px", width: "30px" }}
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
                <div
                  className={
                    message.data().senderEmail === auth?.currentUser?.email
                      ? "chat-message chat-message-sent"
                      : "chat-message chat-message-received"
                  }
                >
                  {message.data().text.match(urlPattern) ? (
                    <a
                      href={message.text}
                      target="blank"
                      className="message-text"
                    >
                      {message.text}
                    </a>
                  ) : message.data().imageURL ? (
                    <a
                      href={message.data().imageURL}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="message-text"
                    >
                      <img
                        src={message.data().imageURL}
                        width={300}
                        alt="img"
                      />
                    </a>
                  ) : message.data().videoURL ? (
                    <video
                      src={message.data().videoURL}
                      controls={true}
                      width={300}
                      style={{ outline: "none" }}
                      className="message-text"
                    ></video>
                  ) : message.data().fileURL ? (
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
                  ) : (
                    <div className="message-text">
                      <p>{message.data().text}</p>
                    </div>
                  )}

                  <span className="chat-timestamp">
                    <p>
                      {new Date(
                        message.data().timestamp.toDate()
                      ).toLocaleTimeString()}
                    </p>
                    {message.data().senderEmail === auth?.currentUser.email && (
                      <Icons.DoneAllIcon
                        color={
                          message.data().senderEmail ===
                            auth?.currentUser.email &&
                          message.data().read === true
                            ? "info"
                            : message.data().senderEmail ===
                              auth?.currentUser.email
                            ? "primary"
                            : ""
                        }
                        sx={{ width: "20px !important" }}
                      />
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(StarredMessages);

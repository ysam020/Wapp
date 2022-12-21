import React from "react";
import { auth } from "../firebase";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneAllIcon from "@mui/icons-material/DoneAll";

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
  })
);

function ChatMessage({ message, time, sender, read }) {
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
      {/* Check if message is a link */}
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
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? classes.readIcon
                      : sender === auth?.currentUser.email
                      ? classes.unreadIcon
                      : ""
                  }
                />
              )}
            </div>
            <span className="chat-timestamp">
              {new Date(time.toDate()).toLocaleTimeString()}
            </span>
          </>
        ) : (
          <>
            <div className="message-text">
              <p>{message}</p>
              {/* <img src="./assets/images/wapp-help.png" width={300} /> */}
              {sender === auth?.currentUser.email && (
                <DoneAllIcon
                  className={
                    sender === auth?.currentUser.email && read === true
                      ? classes.readIcon
                      : sender === auth?.currentUser.email
                      ? classes.unreadIcon
                      : ""
                  }
                />
              )}
            </div>
            <span className="chat-timestamp">
              {new Date(time.toDate()).toLocaleTimeString()}
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default ChatMessage;

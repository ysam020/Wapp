import React from "react";
import * as Icons from "../Icons";
// Assets
import { urlPattern } from "../../assets/data/urlPattern";
// utils
import { downloadMedia } from "../../utils/downloadMedia";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function ChatMessage(props) {
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
          <a href={props.message} target="blank" className="message-text">
            {props.message}
          </a>
        ) : props.imageURL ? (
          <img
            alt="img"
            src={props.imageURL}
            className="message-text"
            onClick={() => downloadMedia(props.imageURL, props.fileName)}
            id="downloadPhoto"
            style={{ cursor: "pointer" }}
          />
        ) : props.videoURL ? (
          <video
            src={props.videoURL}
            controls={true}
            height="auto"
            className="message-text"
            style={{ outline: "none", cursor: "pointer" }}
            onClick={() => downloadMedia(props.videoURL, props.fileName)}
            id="downloadVideo"
          />
        ) : props.fileURL ? (
          <div
            className="message-text-document"
            onClick={() => downloadMedia(props.fileURL, props.fileName)}
            id="downloadFile"
            style={{ cursor: "pointer" }}
          >
            <div className="file-container">
              <div className="file-inner-container">
                <Icons.InsertDriveFileIcon
                  color="primary"
                  sx={{ width: "50px !important", height: "40px !important" }}
                />
                <p>{props.fileName}</p>
                <Icons.FileDownloadIcon
                  color="primary"
                  sx={{
                    width: "20px !important",
                    height: "20px !important",
                    border: "1px solid #7A8F9B",
                    borderRadius: "50%",
                    padding: "5px",
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="message-text">
            <p>{props.message}</p>
          </div>
        )}

        <span className="chat-timestamp">
          {props.starredMessage === true && (
            <Icons.StarRateRoundedIcon
              color="primary"
              sx={{ width: "20px !important" }}
            />
          )}
          <p>
            {new Date(props.time.toDate()).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {props.sender === currentUser.email && (
            <Icons.DoneAllIcon
              color={
                props.sender === currentUser.email && props.read === true
                  ? "info"
                  : props.sender === currentUser.email
                  ? "primary"
                  : ""
              }
              sx={{ width: "20px !important" }}
            />
          )}
        </span>
      </div>
    </>
  );
}

export default React.memo(ChatMessage);

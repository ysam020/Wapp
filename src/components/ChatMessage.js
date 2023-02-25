import React, { useContext } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { UserContext } from "../contexts/Context";

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
  const currentUser = useContext(UserContext);

  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator

  const downloadPhoto = (photoUrl, fileName, extension) => {
    fetch(photoUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "image", {
          type: `image/${extension}`,
        });

        readFile(file);

        function readFile(input) {
          const fr = new FileReader();
          fr.readAsDataURL(input);
          fr.addEventListener("load", () => {
            const res = fr.result;
            let downloadBtn = document.getElementById("downloadPhoto");
            let aTag = document.createElement("a");
            aTag.href = res;
            aTag.download = fileName;
            aTag.click();
            downloadBtn.appendChild(aTag);
            aTag.remove();
          });
        }
      });
  };

  const downloadVideo = (videoUrl, fileName, extension) => {
    fetch(videoUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "video", {
          type: `video/${extension}`,
        });

        readFile(file);

        function readFile(input) {
          const fr = new FileReader();
          fr.readAsDataURL(input);
          fr.addEventListener("load", () => {
            const res = fr.result;
            let downloadBtn = document.getElementById("downloadVideo");
            let aTag = document.createElement("a");
            aTag.href = res;
            aTag.download = fileName;
            aTag.click();
            downloadBtn.appendChild(aTag);
            aTag.remove();
          });
        }
      });
  };

  const downloadFile = (fileUrl, fileName, extension) => {
    fetch(fileUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "application", {
          type: `application/${extension}`,
        });

        readFile(file);

        function readFile(input) {
          const fr = new FileReader();
          fr.readAsDataURL(input);
          fr.addEventListener("load", () => {
            const res = fr.result;
            let downloadBtn = document.getElementById("downloadFile");
            let aTag = document.createElement("a");
            aTag.href = res;
            aTag.download = fileName;
            aTag.click();
            downloadBtn.appendChild(aTag);
            aTag.remove();
          });
        }
      });
  };

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
            <span className="chat-timestamp">
              <StarRateRoundedIcon className={classes.starIcon} />
              <p>
                {new Date(props.time.toDate()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })()}
              </p>
              {props.sender === currentUser.email && (
                <DoneAllIcon
                  className={
                    props.sender === currentUser.email && props.read === true
                      ? `${classes.readIcon}`
                      : props.sender === currentUser.email
                      ? `${classes.unreadIcon}`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : props.imageURL ? (
          <>
            <div
              className="message-text"
              onClick={() =>
                downloadPhoto(props.imageURL, props.fileName, props.extension)
              }
              id="downloadPhoto"
              style={{ cursor: "pointer" }}
            >
              <img alt="img" src={props.imageURL} />
            </div>
            <span className="chat-timestamp">
              {props.starredMessage === true && (
                <StarRateRoundedIcon className={classes.starIcon} />
              )}

              <p>
                {new Date(props.time.toDate()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {props.sender === currentUser.email && (
                <DoneAllIcon
                  className={
                    props.sender === currentUser.email && props.read === true
                      ? `${classes.readIcon} media-delivered-icon`
                      : props.sender === currentUser.email
                      ? `${classes.unreadIcon} media-delivered-icon`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : props.videoURL ? (
          <>
            <div className="message-text">
              <video
                src={props.videoURL}
                controls={true}
                height="auto"
                style={{ outline: "none", cursor: "pointer" }}
                onClick={() =>
                  downloadVideo(props.videoURL, props.fileName, props.extension)
                }
                id="downloadVideo"
              ></video>
            </div>
            <span className="chat-timestamp">
              {props.starredMessage === true && (
                <StarRateRoundedIcon className={classes.starIcon} />
              )}
              <p>
                {new Date(props.time.toDate()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {props.sender === currentUser.email && (
                <DoneAllIcon
                  className={
                    props.sender === currentUser.email && props.read === true
                      ? `${classes.readIcon} media-delivered-icon`
                      : props.sender === currentUser.email
                      ? `${classes.unreadIcon} media-delivered-icon`
                      : ""
                  }
                />
              )}
            </span>
          </>
        ) : props.fileURL ? (
          <>
            <div
              className="message-text-document"
              onClick={() =>
                downloadFile(props.fileURL, props.fileName, props.extension)
              }
              id="downloadFile"
              style={{ cursor: "pointer" }}
            >
              <div className="file-container">
                <div className="file-inner-container">
                  <InsertDriveFileIcon className={classes.fileIcon} />
                  <p>{props.fileName}</p>
                  <FileDownloadIcon className={classes.downloadIcon} />
                </div>
              </div>
            </div>
            <span className="chat-timestamp">
              {props.starredMessage === true && (
                <StarRateRoundedIcon className={classes.starIcon} />
              )}
              <p>
                {new Date(props.time.toDate()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {props.sender === currentUser.email && (
                <DoneAllIcon
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
          </>
        ) : (
          <>
            <div className="message-text">
              <p>{props.message}</p>
            </div>
            <span className="chat-timestamp">
              {props.starredMessage === true && (
                <StarRateRoundedIcon className={classes.starIcon} />
              )}
              <p>
                {new Date(props.time.toDate()).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {props.sender === currentUser.email && (
                <DoneAllIcon
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
          </>
        )}
      </div>
    </>
  );
}

export default React.memo(ChatMessage);

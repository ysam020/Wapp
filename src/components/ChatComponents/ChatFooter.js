import React, { useContext, useEffect, useRef, useState } from "react";
import * as Icons from "../Icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { storage } from "../../firebase";
import { UserContext } from "../../contexts/Context";
import { selectFiles } from "../../utils/selectFiles";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
    mediaIcon: { color: "#fff" },
  })
);

function ChatFooter(props) {
  // MUI styles
  const classes = useStyles();

  // useState
  const [sendMediaList, setSendMediaList] = useState(false);
  const [gifButton, setGifButton] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  // useRef
  const inputImagesRef = useRef();
  const inputVideosRef = useRef();
  const inputDocumentRef = useRef();

  // useContext
  const currentUser = useContext(UserContext);

  useEffect(() => {
    // Hide emoji box on escape button
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        props.setEmojiBox(false);
        setCloseButton(false);
        setGifButton(false);
        props.setGifBox(false);
      }
    });
  });

  return (
    <div className="chat-footer">
      {closeButton && (
        <IconButton
          aria-label="close"
          className={classes.icon}
          onClick={() => {
            props.setEmojiBox(false);
            setCloseButton(!closeButton);
            setGifButton(false);
            props.setGifBox(false);
            props.sendMessageRef.current.focus();
          }}
        >
          <Icons.CloseOutlinedIcon />
        </IconButton>
      )}

      <IconButton
        aria-label="emoji"
        className={classes.icon}
        onClick={() => {
          props.setEmojiBox(true);
          setCloseButton(true);
          setGifButton(true);
          setSendMediaList(false);
          props.setGifBox(false);
          props.sendMessageRef.current.focus();
        }}
      >
        <Icons.InsertEmoticonOutlinedIcon />
      </IconButton>

      {gifButton && (
        <IconButton
          aria-label="gif"
          className={classes.icon}
          onClick={() => {
            props.setGifBox(true);
            props.setEmojiBox(false);
          }}
        >
          <Icons.GifBoxOutlinedIcon />
        </IconButton>
      )}

      <div>
        {sendMediaList && (
          <ul className="send-media-list">
            <li
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #ac44cf 25px, #bf59cf 25px)",
              }}
            >
              <Tooltip title="Photos" placement="right">
                <IconButton
                  aria-label="photo"
                  onClick={() => inputImagesRef.current.click()}
                >
                  <Icons.InsertPhotoIcon className={classes.mediaIcon} />
                  <input
                    accept="image/*"
                    type="file"
                    multiple=""
                    style={{ display: "none" }}
                    ref={inputImagesRef}
                    onChange={(e) => {
                      e.preventDefault();
                      selectFiles(
                        e,
                        storage,
                        currentUser,
                        props.emailId,
                        props.chatUser,
                        props.message,
                        props.chatMessages,
                        props.sendMessageToDatabase,
                        setSendMediaList,
                        sendMediaList
                      );
                    }}
                  ></input>
                </IconButton>
              </Tooltip>
            </li>
            <li
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #0162CB 25px, #0070E6 25px)",
              }}
            >
              <Tooltip title="Videos" placement="right">
                <IconButton
                  aria-label="video"
                  onClick={() => inputVideosRef.current.click()}
                >
                  <Icons.VideoCameraBackIcon className={classes.mediaIcon} />
                  <input
                    accept="video/mp4,video/3gpp,video/quicktime"
                    type="file"
                    multiple=""
                    style={{ display: "none" }}
                    ref={inputVideosRef}
                    onChange={(e) => {
                      e.preventDefault();
                      selectFiles(
                        e,
                        storage,
                        currentUser,
                        props.emailId,
                        props.chatUser,
                        props.message,
                        props.chatMessages,
                        props.sendMessageToDatabase,
                        setSendMediaList,
                        sendMediaList
                      );
                    }}
                  ></input>
                </IconButton>
              </Tooltip>
            </li>
            <li
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #0F9186 25px, #04A598 25px)",
              }}
            >
              <Tooltip title="Document" placement="right">
                <IconButton
                  aria-label="document"
                  onClick={() => inputDocumentRef.current.click()}
                >
                  <Icons.InsertDriveFileIcon className={classes.mediaIcon} />
                  <input
                    accept="*"
                    type="file"
                    multiple=""
                    style={{ display: "none" }}
                    ref={inputDocumentRef}
                    onChange={(e) => {
                      e.preventDefault();
                      selectFiles(
                        e,
                        storage,
                        currentUser,
                        props.emailId,
                        props.chatUser,
                        props.message,
                        props.chatMessages,
                        props.sendMessageToDatabase,
                        setSendMediaList,
                        sendMediaList
                      );
                    }}
                  ></input>
                </IconButton>
              </Tooltip>
            </li>
            <li
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #D3396D 25px, #EC407A 25px)",
              }}
            >
              <Tooltip title="Camera" placement="right">
                <IconButton
                  aria-label="camera"
                  onClick={() => {
                    props.setShowWebcam(!props.showWebcam);
                    setSendMediaList(!sendMediaList);
                    setTimeout(() => {
                      props.setCircularProgress(false);
                    }, 1500);
                  }}
                >
                  <Icons.CameraAltRoundedIcon className={classes.mediaIcon} />
                </IconButton>
              </Tooltip>
            </li>
          </ul>
        )}
        <IconButton
          aria-label="send-media"
          className={classes.icon}
          onClick={() => setSendMediaList(!sendMediaList)}
          style={{ transform: "rotate(45deg)" }}
        >
          <Icons.AttachFileOutlinedIcon />
        </IconButton>
      </div>

      <form onSubmit={props.sendMessage}>
        <input
          placeholder="Type a message"
          type="text"
          value={props.message}
          onChange={(e) => {
            props.setMessage(e.target.value);
            e.target.value === ""
              ? props.setTyping(false)
              : props.setTyping(true);
          }}
          ref={props.sendMessageRef}
        />
        <button type="submit">Send Message</button>
      </form>

      <IconButton aria-label="audio" className={classes.icon}>
        <Icons.MicOutlinedIcon />
      </IconButton>
    </div>
  );
}

export default ChatFooter;

import React, { useContext, useEffect, useRef, useState } from "react";
import * as Icons from "../Icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { storage } from "../../firebase";
import {
  UserContext,
  EmailContext,
  ChatDetailsContext,
} from "../../contexts/Context";
import { selectFiles } from "../../utils/selectFiles";
import { sendMessage } from "../../utils/sendMessage";

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

function ChatFooter() {
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
  const emailId = useContext(EmailContext);
  const chatDetailsContext = useContext(ChatDetailsContext);

  useEffect(() => {
    // Hide emoji box on escape button
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        chatDetailsContext.setEmojiBox(false);
        setCloseButton(false);
        setGifButton(false);
        chatDetailsContext.setGifBox(false);
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
            chatDetailsContext.setEmojiBox(false);
            setCloseButton(!closeButton);
            setGifButton(false);
            chatDetailsContext.setGifBox(false);
            chatDetailsContext.sendMessageRef.current.focus();
          }}
        >
          <Icons.CloseOutlinedIcon />
        </IconButton>
      )}

      <IconButton
        aria-label="emoji"
        className={classes.icon}
        onClick={() => {
          chatDetailsContext.setEmojiBox(true);
          setCloseButton(true);
          setGifButton(true);
          setSendMediaList(false);
          chatDetailsContext.setGifBox(false);
          chatDetailsContext.sendMessageRef.current.focus();
        }}
      >
        <Icons.InsertEmoticonOutlinedIcon />
      </IconButton>

      {gifButton && (
        <IconButton
          aria-label="gif"
          className={classes.icon}
          onClick={() => {
            chatDetailsContext.setGifBox(true);
            chatDetailsContext.setEmojiBox(false);
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
                        emailId,
                        chatDetailsContext.chatUser,
                        chatDetailsContext.message,
                        chatDetailsContext.chatMessages,
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
                        emailId,
                        chatDetailsContext.chatUser,
                        chatDetailsContext.message,
                        chatDetailsContext.chatMessages,
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
                        emailId,
                        chatDetailsContext.chatUser,
                        chatDetailsContext.message,
                        chatDetailsContext.chatMessages,
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
                    chatDetailsContext.setShowWebcam(
                      !chatDetailsContext.showWebcam
                    );
                    setSendMediaList(!sendMediaList);
                    setTimeout(() => {
                      chatDetailsContext.setCircularProgress(false);
                    }, 1000);
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(
            chatDetailsContext.block,
            chatDetailsContext.message,
            emailId,
            currentUser,
            chatDetailsContext.chatUser,
            chatDetailsContext.chatMessages,
            chatDetailsContext.setMessage
          );
        }}
      >
        <input
          placeholder="Type a message"
          type="text"
          value={chatDetailsContext.message}
          onChange={(e) => {
            chatDetailsContext.setMessage(e.target.value);
            e.target.value === ""
              ? chatDetailsContext.setTyping(false)
              : chatDetailsContext.setTyping(true);
          }}
          ref={chatDetailsContext.sendMessageRef}
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

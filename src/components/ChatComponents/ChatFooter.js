import React, { useEffect, useState } from "react";
import * as Icons from "../Icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { storage } from "../../firebase";
import { selectFiles } from "../../utils/selectFiles";
import { sendMessage } from "../../utils/sendMessage";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useContexts from "../../customHooks/contexts";
import useSendMediaList from "../../customHooks/sendMediaList";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
  })
);

function ChatFooter() {
  // MUI styles
  const classes = useStyles();

  // useState
  const [sendMediaList, setSendMediaList] = useState(false);
  const [gifButton, setGifButton] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  // useContext
  const { currentUser, emailId, chatDetailsContext } = useContexts();

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

  const sendMediaListItems = useSendMediaList();

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
            {sendMediaListItems.map((item) => {
              return (
                <li
                  key={item.id}
                  style={{
                    backgroundImage: item.backgroundImage,
                  }}
                >
                  <Tooltip title={item.title} placement="right">
                    {item.title === "Camera" ? (
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
                        <Icons.CameraAltRoundedIcon
                          className={classes.mediaIcon}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="photo"
                        onClick={() => item.ref.current.click()}
                      >
                        {item.icon}
                        <input
                          accept={item.mediaType}
                          type="file"
                          multiple=""
                          style={{ display: "none" }}
                          ref={item.ref}
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
                    )}
                  </Tooltip>
                </li>
              );
            })}
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

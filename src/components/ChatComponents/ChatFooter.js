import React, { useState } from "react";
import { storage } from "../../firebase";
// Components
import * as Icons from "../Icons";
import { IconButton, Tooltip } from "@material-ui/core";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// utils
import { selectFiles } from "../../utils/selectFiles";
import { sendMessage } from "../../utils/sendMessage";
// Custom hooks
import useContexts from "../../customHooks/contexts";
import useSendMediaList from "../../customHooks/sendMediaList";
import useHandleTyping from "../../customHooks/handleTyping";

///////////////////////////////////////////////////////////////////
function ChatFooter() {
  // useState
  const [sendMediaList, setSendMediaList] = useState(false);
  const [gifButton, setGifButton] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  // Custom hooks
  const { currentUser, chatDetailsContext } = useContexts();
  const sendMediaListItems = useSendMediaList();
  const { setTyping } = useHandleTyping();

  return (
    <div className="chat-footer">
      {/* Close button */}
      {closeButton && (
        <IconButton
          aria-label="close"
          onClick={() => {
            chatDetailsContext.setEmojiBox(false);
            setCloseButton(!closeButton);
            setGifButton(false);
            chatDetailsContext.setGifBox(false);
            chatDetailsContext.sendMessageRef.current.focus();
          }}
        >
          <Icons.CloseOutlinedIcon color="primary" />
        </IconButton>
      )}

      {/* Emoji button */}
      <IconButton
        aria-label="emoji"
        onClick={() => {
          chatDetailsContext.setEmojiBox(true);
          setCloseButton(true);
          setGifButton(true);
          setSendMediaList(false);
          chatDetailsContext.setGifBox(false);
          chatDetailsContext.sendMessageRef.current.focus();
        }}
      >
        <Icons.InsertEmoticonOutlinedIcon color="primary" />
      </IconButton>

      {/* Gif button */}
      {gifButton && (
        <IconButton
          aria-label="gif"
          onClick={() => {
            chatDetailsContext.setGifBox(true);
            chatDetailsContext.setEmojiBox(false);
          }}
        >
          <Icons.GifBoxOutlinedIcon color="primary" />
        </IconButton>
      )}

      {/* Send media icons */}
      <div style={{ position: "relative" }}>
        <IconButton
          aria-label="attachment"
          onClick={(event) => {
            event.stopPropagation();
            setSendMediaList(!sendMediaList);
          }}
        >
          <Icons.AttachFileOutlinedIcon color="primary" />
        </IconButton>

        <div style={{ position: "absolute", top: "-100%" }}>
          <ClickAwayListener
            onClickAway={() => {
              setSendMediaList(false);
            }}
          >
            <div>
              <ul
                className={
                  sendMediaList
                    ? "send-media-list send-media-list-active"
                    : "send-media-list"
                }
              >
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
                            aria-label={item.label}
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
                            <Icons.CameraAltRoundedIcon color="secondary" />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label={item.label}
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
                                  chatDetailsContext.chatUser.email,
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
            </div>
          </ClickAwayListener>
        </div>
      </div>

      {/* Text input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(
            chatDetailsContext.block,
            chatDetailsContext.message,
            chatDetailsContext.chatUser.email,
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
            e.target.value === "" ? setTyping(false) : setTyping(true);
          }}
          ref={chatDetailsContext.sendMessageRef}
        />
        <button type="submit">Send Message</button>
      </form>

      <IconButton aria-label="audio">
        <Icons.MicOutlinedIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default React.memo(ChatFooter);

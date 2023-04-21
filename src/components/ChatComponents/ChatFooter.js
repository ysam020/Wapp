import React, { useState } from "react";
import { storage } from "../../firebase";
// Components
import * as Icons from "../Icons";
import { IconButton, Tooltip } from "@material-ui/core";
// utils
import { selectFiles } from "../../utils/selectFiles";
import { sendMessage } from "../../utils/sendMessage";
// Custom hooks
import useContexts from "../../customHooks/contexts";
import useSendMediaList from "../../customHooks/sendMediaList";

///////////////////////////////////////////////////////////////////
function ChatFooter() {
  // useState
  const [sendMediaList, setSendMediaList] = useState(false);
  const [gifButton, setGifButton] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  // Custom hooks
  const { currentUser, emailId, chatDetailsContext } = useContexts();
  const sendMediaListItems = useSendMediaList();

  return (
    <div className="chat-footer">
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
          onClick={() => setSendMediaList(!sendMediaList)}
          style={{ transform: "rotate(45deg)" }}
        >
          <Icons.AttachFileOutlinedIcon color="primary" />
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

      <IconButton aria-label="audio">
        <Icons.MicOutlinedIcon color="primary" />
      </IconButton>
    </div>
  );
}

export default ChatFooter;

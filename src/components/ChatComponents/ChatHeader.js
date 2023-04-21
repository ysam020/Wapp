import React from "react";
import moment from "moment";
// Components
import { IconButton, Avatar } from "@material-ui/core";
import * as Icons from "../Icons";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// Custom hooks
import useContexts from "../../customHooks/contexts";
import useHandleTypingIndicator from "../../customHooks/handleTypingIndicator";
import useChatPopover from "../../customHooks/chatPopover";

///////////////////////////////////////////////////////////////////
function ChatHeader() {
  // Custom hooks
  const {
    chatDetailsContext,
    toggleContactInfoDispatch,
    searchMessageDispatch,
    starredMessageDispatch,
    disappearingMessagesDispatch,
    encryptionDispatch,
  } = useContexts();

  const { typingIndicator } = useHandleTypingIndicator();
  const { chatPropoverList, chatPopover, setChatPopover } = useChatPopover();

  return (
    <div className="chat-header">
      <IconButton
        aria-label="avatar"
        onClick={() => {
          toggleContactInfoDispatch("toggle");

          starredMessageDispatch("hide");
          disappearingMessagesDispatch("hide");
          encryptionDispatch("hide");
        }}
      >
        <Avatar
          src={chatDetailsContext.chatUser.photoURL}
          alt={chatDetailsContext.chatUser.fullname}
        />
      </IconButton>

      <div className="chat-header-info">
        <h3>{chatDetailsContext.chatUser?.fullname}</h3>
        {typingIndicator && typingIndicator === true ? (
          <p className="typing-indicator">typing...</p>
        ) : (
          chatDetailsContext.lastSeen && (
            <p>{`Last seen ${moment(
              chatDetailsContext.lastSeen.toDate()
            ).fromNow()}`}</p>
          )
        )}
      </div>

      <div className="chat-header-right">
        <IconButton
          aria-label="search"
          onClick={() => {
            searchMessageDispatch("toggle");
          }}
        >
          <Icons.SearchOutlinedIcon color="primary" />
        </IconButton>

        <div className="chat-popover-container">
          <IconButton
            aria-label="more"
            onClick={() => setChatPopover(!chatPopover)}
          >
            <Icons.MoreVertRoundedIcon color="primary" />
          </IconButton>
          {chatPopover && (
            <ClickAwayListener onClickAway={() => setChatPopover(!chatPopover)}>
              <div className="chat-popover">
                {chatPropoverList.map((item) => {
                  return (
                    <h4 key={item.id} onClick={item.onClick}>
                      {item.name}
                    </h4>
                  );
                })}
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

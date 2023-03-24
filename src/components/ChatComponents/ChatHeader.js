import React, { useContext, useState, useEffect } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import * as Icons from "../Icons";
import {
  ToggleContactInfoContext,
  DisappearingMessagesContext,
  SearchMessageContext,
  UserContext,
  ChatDetailsContext,
  EmailContext,
} from "../../contexts/Context";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import moment from "moment";
import { deleteChat } from "../../utils/deleteChat";
import { handleTypingIndicator } from "../../utils/typing";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
  })
);

function ChatHeader() {
  // MUI styles
  const classes = useStyles();

  // useState
  const [typingIndicator, setTypingIndicator] = useState();
  const [chatPopover, setChatPopover] = useState(false);

  // useContext
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const disappearingMessagesContext = useContext(DisappearingMessagesContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);
  const chatDetailsContext = useContext(ChatDetailsContext);
  const emailId = useContext(EmailContext);

  useEffect(() => {
    handleTypingIndicator(setTypingIndicator, emailId, currentUser);
    // eslint-disable-next-line
  }, [typingIndicator]);

  // Close chat popover if clicked outside
  const handleClickAway = () => {
    setChatPopover(!chatPopover);
  };

  // Chat Popover
  const handleChatPopover = () => {
    setChatPopover(!chatPopover);
  };

  return (
    <div className="chat-header">
      <IconButton
        aria-label="avatar"
        onClick={() => {
          toggleContactInfoContext.toggleContactInfoDispatch("toggle");
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
          className={classes.icon}
          onClick={() => {
            searchMessageContext.searchMessageDispatch("toggle");
          }}
        >
          <Icons.SearchOutlinedIcon />
        </IconButton>

        <div className="chat-popover-container">
          <IconButton
            aria-label="more"
            onClick={handleChatPopover}
            className={classes.icon}
          >
            <Icons.MoreVertRoundedIcon />
          </IconButton>
          {chatPopover && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="chat-popover">
                <h4
                  onClick={() => {
                    toggleContactInfoContext.toggleContactInfoDispatch(
                      "toggle"
                    );
                    handleChatPopover();
                  }}
                >
                  Contact info
                </h4>
                <h4
                  onClick={() => {
                    chatDetailsContext.setSelectMessagesUI(
                      !chatDetailsContext.selectMessagesUI
                    );
                    handleChatPopover();
                  }}
                >
                  Select messages
                </h4>
                <h4
                  onClick={() => {
                    chatDetailsContext.closeChat();
                    handleClickAway();
                  }}
                >
                  Close chat
                </h4>
                <h4>Mute notifications</h4>
                <h4
                  onClick={() => {
                    disappearingMessagesContext.disappearingMessagesDispatch(
                      "toggle"
                    );
                    handleChatPopover();
                  }}
                >
                  Disappearing messages
                </h4>
                <h4>Clear messages</h4>
                <h4
                  onClick={() => {
                    deleteChat(
                      emailId,
                      currentUser,
                      chatDetailsContext.setChat
                    );
                    handleChatPopover();
                  }}
                >
                  Delete chat
                </h4>
              </div>
            </ClickAwayListener>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

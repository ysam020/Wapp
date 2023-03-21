import React, { useContext, useState, useEffect } from "react";
import { IconButton, Avatar } from "@material-ui/core";
import * as Icons from "../Icons";
import {
  ToggleContactInfoContext,
  DisappearingMessagesContext,
  SearchMessageContext,
  UserContext,
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

function ChatHeader(props) {
  // MUI styles
  const classes = useStyles();

  // useState
  const [typingIndicator, setTypingIndicator] = useState();

  // useContext
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const disappearingMessagesContext = useContext(DisappearingMessagesContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    handleTypingIndicator(setTypingIndicator, props.emailId, props.currentUser);
    // eslint-disable-next-line
  }, [typingIndicator]);

  return (
    <div className="chat-header">
      <IconButton
        aria-label="avatar"
        onClick={() => {
          toggleContactInfoContext.toggleContactInfoDispatch("toggle");
        }}
      >
        <Avatar src={props.chatUser.photoURL} alt={props.chatUser.fullname} />
      </IconButton>

      <div className="chat-header-info">
        <h3>{props.chatUser?.fullname}</h3>
        {typingIndicator && typingIndicator === true ? (
          <p className="typing-indicator">typing...</p>
        ) : (
          props.lastSeen && (
            <p>{`Last seen ${moment(props.lastSeen.toDate()).fromNow()}`}</p>
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
            onClick={props.handleChatPopover}
            className={classes.icon}
          >
            <Icons.MoreVertRoundedIcon />
          </IconButton>
          {props.chatPopover && (
            <ClickAwayListener onClickAway={props.handleClickAway}>
              <div className="chat-popover">
                <h4
                  onClick={() => {
                    toggleContactInfoContext.toggleContactInfoDispatch(
                      "toggle"
                    );
                    props.handleChatPopover();
                  }}
                >
                  Contact info
                </h4>
                <h4
                  onClick={() => {
                    props.setSelectMessagesUI(!props.selectMessagesUI);
                    props.handleChatPopover();
                  }}
                >
                  Select messages
                </h4>
                <h4 onClick={props.closeChat}>Close chat</h4>
                <h4>Mute notifications</h4>
                <h4
                  onClick={() => {
                    disappearingMessagesContext.disappearingMessagesDispatch(
                      "toggle"
                    );
                    props.handleChatPopover();
                  }}
                >
                  Disappearing messages
                </h4>
                <h4>Clear messages</h4>
                <h4
                  onClick={() => {
                    deleteChat(props.emailId, currentUser, props.setChat);
                    props.handleChatPopover();
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

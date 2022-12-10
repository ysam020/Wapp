import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chat.css";
import { useParams } from "react-router-dom";
import db from "../firebase";
import {
  ThemeContext,
  ToggleContactInfoContext,
  UserContext,
  SearchMessageContext,
} from "../contexts/Context";
import ChatMessage from "../components/ChatMessage";

import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
  })
);

function Chat({
  chatPopover,
  handleChatPopover,
  handleClickAway,
  message,
  setMessage,
  sendMessage,
  getMessages,
  chatMessages,
  lastMessageTime,
  chatUser,
  setChatUser,
  block,
  setBlock,
}) {
  // MUI Styles
  const classes = useStyles();

  const navigate = useNavigate();

  const ref = useRef(null);
  const chatBox = useRef(null);

  const [emojiBox, setEmojiBox] = useState(false);
  const [closeButton, setCloseButton] = useState(false);
  const [gifButton, setGifButton] = useState(false);

  // Contexts
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const themeContext = useContext(ThemeContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);

  // Get email id from url
  const { emailId } = useParams();

  useEffect(() => {
    // Get users from database
    const getUser = async () => {
      db.collection("users")
        .doc(emailId)
        .onSnapshot((snapshot) => setChatUser(snapshot.data()));
    };

    // Check blocked user
    const checkBlockedUser = () => {
      db.collection("blockedUser")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setBlock(
            snapshot.docs.filter((doc) => doc.data().email === chatUser?.email)
          );
        });
    };

    getUser();
    getMessages();
    checkBlockedUser();
  }, [chatMessages]); // Run each time chatMessages is update

  // Hide emojiBox on escape key
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        setEmojiBox(false);
        setCloseButton(false);
        setGifButton(false);
      }
    });
  }, []);

  // Scroll to bottom of chat when message is sent or received
  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]); // Run each time chatMessages is update

  // Close chat function
  const closeChat = () => {
    navigate("/");
    // Set ToggleContactInfoContext state to false
    toggleContactInfoContext.toggleContactInfoDispatch("hide");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <IconButton
          onClick={() => {
            toggleContactInfoContext.toggleContactInfoDispatch("toggle");
          }}
        >
          <Avatar src={chatUser?.photoURL} />
        </IconButton>

        <div className="chat-header-info">
          <h3>{chatUser?.fullname}</h3>
          <p>{`Last seen ${moment(lastMessageTime).fromNow()}`}</p>
        </div>

        <div className="chat-header-right">
          <IconButton
            className={classes.icon}
            onClick={() => {
              searchMessageContext.searchMessageDispatch("toggle");
            }}
          >
            <SearchOutlinedIcon />
          </IconButton>

          <div className="chat-popover-container">
            <IconButton onClick={handleChatPopover} className={classes.icon}>
              <MoreVertRoundedIcon />
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
                  <h4>Select messages</h4>
                  <h4 onClick={closeChat}>Close chat</h4>
                  <h4>Mute notifications</h4>
                  <h4>Disappearing messages</h4>
                  <h4>Clear messages</h4>
                  <h4>Delete chat</h4>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>

      <div
        // Conditional classname for chat body
        className={
          themeContext.theme === "light" ? "chat-body" : "chat-body-dark"
        }
        ref={chatBox}
      >
        <div className="chat-message-container">
          {chatMessages.map((message, id) => (
            <ChatMessage
              key={id}
              message={message.text}
              time={message.timestamp}
              sender={message.senderEmail}
              emoji={message.emojiURL}
            />
          ))}
        </div>

        {/* If user is blocked, display block notification */}
        {block.length !== 0 ? (
          <div className="block-notification">
            <p>You blocked this contact</p>
          </div>
        ) : (
          ""
        )}
      </div>

      {emojiBox && (
        <EmojiPicker
          onEmojiClick={(event, emojiObject) => {
            setMessage(message + emojiObject.emoji);
            ref.current.focus();
          }}
          groupNames={{
            smileys_people: "Smileys and People",
            animals_nature: "Animals & Nature",
            food_drink: "Food & Drink",
            travel_places: "Travel & Places",
            activities: "Activity",
            objects: "Objects",
            symbols: "Symbols",
            flags: "Flags",
            recently_used: "Recent",
          }}
          searchPlaceholder="Search Emoji"
          preload={true}
        />
      )}

      <div className="chat-footer">
        {closeButton && (
          <IconButton
            className={classes.icon}
            onClick={() => {
              setEmojiBox(!emojiBox);
              setCloseButton(!closeButton);
              setGifButton(!gifButton);
              ref.current.focus();
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        )}

        <IconButton
          className={classes.icon}
          onClick={() => {
            setEmojiBox(true);
            setCloseButton(true);
            setGifButton(true);
            ref.current.focus();
          }}
        >
          <InsertEmoticonOutlinedIcon />
        </IconButton>

        {gifButton && (
          <IconButton className={classes.icon}>
            <GifBoxOutlinedIcon />
          </IconButton>
        )}

        <IconButton className={classes.icon}>
          <AttachFileOutlinedIcon />
        </IconButton>

        <form>
          <input
            placeholder="Type a message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={ref}
          />
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>

        <IconButton className={classes.icon}>
          <MicOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;

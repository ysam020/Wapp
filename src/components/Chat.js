import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import "../styles/chat.css";
import db, { storage } from "../firebase";
import {
  ToggleContactInfoContext,
  UserContext,
  SearchMessageContext,
  ChatBackgroundContext,
  DisappearingMessagesContext,
} from "../contexts/Context";
import ChatMessage from "../components/ChatMessage";
import ForwardMessageModal from "./ForwardMessageModal";

// MUI components
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import ClickAwayListener from "@mui/material/ClickAwayListener";

// Material icons
import * as Icons from "./Icons";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import Tenor from "react-tenor";
import "react-tenor/dist/styles.css";
import Webcam from "react-webcam";
import firebase from "firebase/app";
import chatDoodle from "../assets/images/chat-doodle.png";
import { getMessages } from "../utils/getMessages";

import { sendMessageToDatabase } from "../utils/sendMessageToDatabase";
import { deleteChat } from "../utils/deleteChat";
import { deleteSelectedMessages } from "../utils/deleteSelectedMessages";
import { starMessages } from "../utils/starMessages";
import { selectFiles } from "../utils/selectFiles";
import { selectGif } from "../utils/selectGIF";
import { clickImage } from "../utils/clickImage";
import { markMessageAsread } from "../utils/markMessageAsRead";
import { handleTyping, handleTypingIndicator } from "../utils/typing";
import { getTimeAgo } from "../utils/getTimeAgo";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
    mediaIcon: { color: "#fff" },
    webcamCameraIcon: {
      color: "#fff",
      backgroundColor: "#04A784",
      padding: "20px",
      borderRadius: "50%",
      transform: "translateY(-30px)",
      cursor: "pointer",
    },
    webcamCloseIcon: { color: "#fff" },
    circularProgressIcon: {
      width: "60px !important",
      height: "60px !important",
      color: "#8696A0 !important",
    },
  })
);

function Chat(props) {
  // MUI Styles
  const classes = useStyles();

  // Ref
  const sendMessageRef = useRef(null);
  const chatBox = useRef(null);
  const inputImagesRef = useRef();
  const inputVideosRef = useRef();
  const inputDocumentRef = useRef();
  const webcamRef = useRef(null);

  // Use state
  const [emojiBox, setEmojiBox] = useState(false);
  const [closeButton, setCloseButton] = useState(false);
  const [gifButton, setGifButton] = useState(false);
  const [lastSeen, setLastSeen] = useState();
  const [sendMediaList, setSendMediaList] = useState(false);
  const [chatWallpaper, setChatWallpaper] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [circularProgress, setCircularProgress] = useState(true);
  const [gifBox, setGifBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState();

  // Contexts
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const disappearingMessagesContext = useContext(DisappearingMessagesContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);
  const { chatBackground, doodle } = useContext(ChatBackgroundContext);

  var chatUserRef = db.collection("users").doc(props.emailId);

  var senderMessageCollectionRef = db
    .collection("chats")
    .doc(currentUser.email)
    .collection("messages");

  var receiverMessageCollectionRef = db
    .collection("chats")
    .doc(props.emailId)
    .collection("messages");

  var blockedUserCollectionRef = db
    .collection("blockedUser")
    .doc(currentUser.email)
    .collection("list");

  var senderFriendListRef = db
    .collection("FriendList")
    .doc(currentUser.email)
    .collection("list")
    .doc(props.emailId);

  var receiverFriendListRef = db
    .collection("FriendList")
    .doc(props.emailId)
    .collection("list")
    .doc(currentUser.email);

  // Get users from database
  const getUser = useCallback(() => {
    chatUserRef.onSnapshot((snapshot) => props.setChatUser(snapshot.data()));
    // eslint-disable-next-line
  }, [props.chatUser]);

  // Check blocked user
  const checkBlockedUser = useCallback(() => {
    blockedUserCollectionRef.onSnapshot((snapshot) => {
      props.setBlock(
        snapshot.docs.filter((doc) => doc.data().email === props.chatUser.email)
      );
    });
    // eslint-disable-next-line
  }, [props.block]);

  useEffect(() => {
    getUser();
    checkBlockedUser();

    // Get last online time
    chatUserRef.onSnapshot((snapshot) =>
      setLastSeen(snapshot.data().lastOnline)
    );

    // eslint-disable-next-line
  }, [
    props.chatMessages,
    props.chatUser.email,
    props.emailId,
    props.setBlock,

    // props.setChatUser,
  ]);

  useEffect(() => {
    getMessages(
      senderMessageCollectionRef,
      currentUser,
      props.emailId,
      props.setStarredMessages,
      props.setChatMessages
    );
    // eslint-disable-next-line
  }, [props.emailId]);

  useEffect(() => {
    // Hide emoji box on escape button
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        setEmojiBox(false);
        setCloseButton(false);
        setGifButton(false);
        setGifBox(false);
      }
    });

    // Focus send message input
    if (
      showWebcam === false &&
      props.selectMessagesUI === false &&
      props.block.length === 0
    ) {
      sendMessageRef.current.focus();
    }

    // Mark messages as read when chat component loads
    markMessageAsread(receiverMessageCollectionRef, props.emailId, currentUser);
  });

  // Scroll to bottom of chat when message is sent or received
  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [props.chatMessages]); // Run each time chatMessages is update

  // Close chat function
  const closeChat = () => {
    toggleContactInfoContext.toggleContactInfoDispatch("hide");
    props.setChat(false);
    props.handleChatPopover();
    localStorage.removeItem("chat");
  };

  // Wallpaper doodles
  useEffect(() => {
    if (doodle) {
      setChatWallpaper(chatDoodle);
    } else {
      setChatWallpaper("");
    }
  }, [doodle]);

  useEffect(() => {
    handleTyping(typing, receiverFriendListRef);
    // eslint-disable-next-line
  }, [typing]);

  useEffect(() => {
    handleTypingIndicator(senderFriendListRef, setTypingIndicator);
    // eslint-disable-next-line
  }, [typingIndicator]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser([]);
  };

  // Check if message timestamp is same as that of previous message timestamp
  const getPreviousMessageDate = (index) => {
    return index === 0
      ? props.chatMessages[0].timestamp.toDate().toLocaleDateString()
      : props.chatMessages[index].timestamp.toDate().toLocaleDateString() ===
        props.chatMessages[index - 1].timestamp.toDate().toLocaleDateString()
      ? null
      : props.chatMessages[index].timestamp.toDate().toLocaleDateString();
  };

  return (
    <div className="chat">
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
            lastSeen && (
              <p>{`Last seen ${moment(lastSeen.toDate()).fromNow()}`}</p>
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
                  <h4 onClick={closeChat}>Close chat</h4>
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
                      deleteChat(
                        props.emailId,
                        currentUser,
                        senderMessageCollectionRef,
                        receiverMessageCollectionRef,
                        senderFriendListRef,
                        receiverFriendListRef,
                        props.setChat
                      );
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

      <div
        className="chat-body"
        ref={chatBox}
        style={{
          backgroundColor: `${chatBackground}`,
          backgroundImage: `url(${chatWallpaper}`,
        }}
      >
        {showWebcam ? (
          <div className="webcam-container">
            <div className="webcam-header">
              <IconButton
                aria-label="close"
                onClick={() => {
                  setShowWebcam(false);
                  setCircularProgress(true);
                }}
              >
                <Icons.CloseOutlinedIcon className={classes.webcamCloseIcon} />
              </IconButton>
              <h3>Take Photo</h3>
            </div>
            {!circularProgress ? (
              <>
                <Webcam className="webcam" ref={webcamRef} />
                <Icons.CameraAltRoundedIcon
                  className={classes.webcamCameraIcon}
                  onClick={() =>
                    clickImage(
                      webcamRef,
                      storage,
                      currentUser,
                      props,
                      firebase,
                      sendMessageToDatabase,
                      senderMessageCollectionRef,
                      receiverMessageCollectionRef,
                      senderFriendListRef,
                      receiverFriendListRef,
                      setShowWebcam,
                      setCircularProgress
                    )
                  }
                />
              </>
            ) : (
              <div className="webcam-body">
                <CircularProgress className={classes.circularProgressIcon} />
              </div>
            )}
          </div>
        ) : (
          <div className="chat-body-inner-container">
            {props.chatMessages.map((message, index) => {
              return (
                <div
                  className={
                    props.selectMessagesUI
                      ? "message-row select-messages"
                      : "message-row"
                  }
                  key={index}
                >
                  {props.selectMessagesUI && (
                    <Checkbox
                      sx={{
                        color: "#8696A0",
                        "&.Mui-checked": {
                          color: "#04A784",
                        },
                      }}
                      disableRipple={true}
                      onChange={(event) => {
                        if (event.target.checked) {
                          props.setSelectedMessages([
                            ...props.selectedMessages,
                            message.messageId,
                          ]);
                        } else {
                          props.setSelectedMessages(
                            props.selectedMessages.filter(
                              (item) => item !== message.messageId
                            )
                          );
                        }
                      }}
                    />
                  )}

                  <div className="chat-message-box">
                    <div className="chat-date">
                      {getPreviousMessageDate(index) && (
                        <p>{getTimeAgo(index, getPreviousMessageDate)}</p>
                      )}
                    </div>

                    <ChatMessage
                      message={message.text}
                      starredMessage={message.starred}
                      time={message.timestamp}
                      sender={message.senderEmail}
                      read={message.read}
                      imageURL={message.imageURL}
                      imageName={message.imageName}
                      videoURL={message.videoURL}
                      videoName={message.videoName}
                      fileURL={message.fileURL}
                      fileName={message.fileName}
                      extension={message.extension}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Emoji box */}
      {emojiBox && (
        <EmojiPicker
          onEmojiClick={(emojiObject) => {
            props.setMessage(props.message + emojiObject.emoji);
            sendMessageRef.current.focus();
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

      {/* Gif picker */}
      {gifBox && (
        <Tenor
          defaultResults={true}
          limit={1000}
          searchPlaceholder="Search GIFs via Tenor"
          onSelect={(result) =>
            selectGif(
              currentUser,
              props,
              firebase,
              sendMessageToDatabase,
              senderMessageCollectionRef,
              receiverMessageCollectionRef,
              senderFriendListRef,
              receiverFriendListRef,
              result
            )
          }
        />
      )}

      {showWebcam === false && props.block.length !== 0 ? (
        <div className="chat-footer-blocked">
          <p>Cant send message to a blocked contact {props.chatUser.email}</p>
        </div>
      ) : showWebcam === true ? (
        ""
      ) : showWebcam === false &&
        props.block.length === 0 &&
        props.selectMessagesUI === true ? (
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="chat-footer"
        >
          <IconButton
            aria-label="close"
            onClick={() => {
              props.setSelectMessagesUI(false);
              props.setSelectedMessages([]);
            }}
          >
            <Icons.CloseOutlinedIcon className={classes.icon} />
          </IconButton>
          <p>{`${props.selectedMessages.length} selected`}</p>
          <IconButton
            aria-label="star-messages"
            onClick={starMessages(
              props.selectedMessages,
              senderMessageCollectionRef
            )}
            disabled={props.selectedMessages.length === 0 ? true : false}
          >
            <Icons.StarRateRoundedIcon className={classes.icon} />
          </IconButton>

          <IconButton
            aria-label="delete-messages"
            onClick={() =>
              deleteSelectedMessages(
                props.selectedMessages,
                senderMessageCollectionRef,
                props.chatMessages,
                senderFriendListRef,
                receiverMessageCollectionRef,
                props.setSelectMessagesUI,
                props.setSelectedMessages
              )
            }
            disabled={props.selectedMessages.length === 0 ? true : false}
          >
            <Icons.DeleteRoundedIcon className={classes.icon} />
          </IconButton>

          <IconButton
            aria-label="forward-messages"
            disabled={props.selectedMessages.length === 0 ? true : false}
            onClick={() => handleOpenModal()}
          >
            <Icons.ShortcutIcon className={classes.icon} />
          </IconButton>
        </div>
      ) : (
        <div className="chat-footer">
          {closeButton && (
            <IconButton
              aria-label="close"
              className={classes.icon}
              onClick={() => {
                setEmojiBox(false);
                setCloseButton(!closeButton);
                setGifButton(false);
                setGifBox(false);
                sendMessageRef.current.focus();
              }}
            >
              <Icons.CloseOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            aria-label="emoji"
            className={classes.icon}
            onClick={() => {
              setEmojiBox(true);
              setCloseButton(true);
              setGifButton(true);
              setSendMediaList(false);
              setGifBox(false);
              sendMessageRef.current.focus();
            }}
          >
            <Icons.InsertEmoticonOutlinedIcon />
          </IconButton>

          {gifButton && (
            <IconButton
              aria-label="gif"
              className={classes.icon}
              onClick={() => {
                setGifBox(true);
                setEmojiBox(false);
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
                            props,
                            firebase,
                            sendMessageToDatabase,
                            senderMessageCollectionRef,
                            receiverMessageCollectionRef,
                            senderFriendListRef,
                            receiverFriendListRef,
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
                      <Icons.VideoCameraBackIcon
                        className={classes.mediaIcon}
                      />
                      <input
                        accept="video/mp4,video/3gpp,video/quicktime"
                        type="file"
                        multiple=""
                        style={{ display: "none" }}
                        ref={inputVideosRef}
                        onChange={(e) => {
                          e.preventDefault();
                          selectFiles(
                            storage,
                            currentUser,
                            props,
                            firebase,
                            sendMessageToDatabase,
                            senderMessageCollectionRef,
                            receiverMessageCollectionRef,
                            senderFriendListRef,
                            receiverFriendListRef,
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
                      <Icons.InsertDriveFileIcon
                        className={classes.mediaIcon}
                      />
                      <input
                        accept="*"
                        type="file"
                        multiple=""
                        style={{ display: "none" }}
                        ref={inputDocumentRef}
                        onChange={(e) => {
                          e.preventDefault();
                          selectFiles(
                            storage,
                            currentUser,
                            props,
                            firebase,
                            sendMessageToDatabase,
                            senderMessageCollectionRef,
                            receiverMessageCollectionRef,
                            senderFriendListRef,
                            receiverFriendListRef,
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
                        setShowWebcam(!showWebcam);
                        setSendMediaList(!sendMediaList);
                        setTimeout(() => {
                          setCircularProgress(false);
                        }, 1500);
                      }}
                    >
                      <Icons.CameraAltRoundedIcon
                        className={classes.mediaIcon}
                      />
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
                e.target.value === "" ? setTyping(false) : setTyping(true);
              }}
              ref={sendMessageRef}
            />
            <button type="submit">Send Message</button>
          </form>

          <IconButton aria-label="audio" className={classes.icon}>
            <Icons.MicOutlinedIcon />
          </IconButton>
        </div>
      )}

      <ForwardMessageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedMessages={props.selectedMessages}
      />
    </div>
  );
}

export default React.memo(Chat);

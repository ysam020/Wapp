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
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

import moment from "moment";
import EmojiPicker from "emoji-picker-react";
import Tenor from "react-tenor";
import "react-tenor/dist/styles.css";
import Webcam from "react-webcam";
import firebase from "firebase/app";
import cryptoRandomString from "crypto-random-string";

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
    props.getMessages();
    // eslint-disable-next-line
  }, [props.emailId]);

  useEffect(() => {
    // Hide emoji box on escape button
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        // Hide emojiBox on escape key
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

  // Upload media and send message
  const selectFiles = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    let randomString = cryptoRandomString({ length: 10 });

    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            // If images
            if (e.target.getAttribute("accept") === "image/*") {
              let payload = {
                text: "Photo",
                messageId: randomString,
                messageInfo: "Photo",
                senderEmail: currentUser.email,
                receiverEmail: props.emailId,
                timestamp: firebase.firestore.Timestamp.now(),
                read: false,
                imageURL: url,
              };

              props.sendMessageToDatabase(payload);
            }
            // If videos
            else if (
              e.target.getAttribute("accept") ===
              "video/mp4,video/3gpp,video/quicktime"
            ) {
              let payload = {
                text: "Video",
                messageId: randomString,
                messageInfo: "Video",
                senderEmail: currentUser.email,
                receiverEmail: props.emailId,
                timestamp: firebase.firestore.Timestamp.now(),
                read: false,
                videoURL: url,
              };

              props.sendMessageToDatabase(payload);
            }
            // If documents
            else if (e.target.getAttribute("accept") === "*") {
              let payload = {
                text: "Document",
                messageId: randomString,
                messageInfo: "Document",
                senderEmail: currentUser.email,
                receiverEmail: props.emailId,
                timestamp: firebase.firestore.Timestamp.now(),
                read: false,
                fileURL: url,
                fileName: e.target.files[0].name,
              };

              props.sendMessageToDatabase(payload);
            }
          });
      }
    );

    setSendMediaList(!sendMediaList);
  };

  const selectGif = (result) => {
    let randomString = cryptoRandomString({ length: 10 });

    let payload = {
      text: "Gif",
      messageId: randomString,
      messageInfo: "Gif",
      senderEmail: currentUser.email,
      receiverEmail: props.emailId,
      timestamp: firebase.firestore.Timestamp.now(),
      read: false,
      imageURL: result.media[0].gif.url,
    };

    props.sendMessageToDatabase(payload);
  };

  // Wallpaper doodles
  useEffect(() => {
    if (doodle) {
      setChatWallpaper(
        "https://firebasestorage.googleapis.com/v0/b/wapp-c2920.appspot.com/o/assets%2Fimages%2Fwapp-bg.png?alt=media&token=5ed64ae3-3250-48ec-9f84-b196951273e8"
      );
    } else {
      setChatWallpaper("");
    }
  }, [doodle]);

  const clickImage = () => {
    const clickedImage = webcamRef.current.getScreenshot();
    let randomString = cryptoRandomString({ length: 10 });

    const uploadTask = storage
      .ref(`files/Img${randomString}`)
      .putString(clickedImage, "data_url", { contentType: "image/jpg" });

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(`Img${randomString}`)
          .getDownloadURL()
          .then((url) => {
            let payload = {
              text: "Photo",
              messageId: randomString,
              messageInfo: "Photo",
              senderEmail: currentUser.email,
              receiverEmail: props.emailId,
              timestamp: firebase.firestore.Timestamp.now(),
              read: false,
              imageURL: url,
            };

            props.sendMessageToDatabase(payload);
          });
      }
    );

    setShowWebcam(false);
    setCircularProgress(true);
  };

  // Update typing to database
  const handleTyping = useCallback(() => {
    if (typing === true) {
      receiverFriendListRef.update({ typing: true });
    } else {
      receiverFriendListRef.update({ typing: false });
    }
    // eslint-disable-next-line
  }, [typing]);

  useEffect(() => {
    handleTyping();
    // eslint-disable-next-line
  }, [typing]);

  // Get typing indicator from database
  const handleTypingIndicator = useCallback(() => {
    senderFriendListRef.onSnapshot((snapshot) => {
      setTypingIndicator(snapshot.data().typing);
    });
    // eslint-disable-next-line
  }, [typingIndicator]);

  useEffect(() => {
    handleTypingIndicator();
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

  // Classify timestamp based on time ago
  const getTimeAgo = (index) => {
    const currentDate = new Date();

    if (getPreviousMessageDate(index) !== null) {
      var messageDate = getPreviousMessageDate(index);

      var dateArray = messageDate.split("/");
      dateArray.reverse();

      var newMessageDate = new Date(dateArray.join("/"));
    }

    var diffTime = currentDate - newMessageDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    if (diffDays < 1) {
      return "Today";
    } else if (diffDays < 2) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return newMessageDate.toLocaleString("default", { weekday: "long" });
    } else {
      return newMessageDate.toLocaleDateString();
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <IconButton
          onClick={() => {
            toggleContactInfoContext.toggleContactInfoDispatch("toggle");
          }}
        >
          <Avatar src={props.chatUser.photoURL} />
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
            className={classes.icon}
            onClick={() => {
              searchMessageContext.searchMessageDispatch("toggle");
            }}
          >
            <SearchOutlinedIcon />
          </IconButton>

          <div className="chat-popover-container">
            <IconButton
              onClick={props.handleChatPopover}
              className={classes.icon}
            >
              <MoreVertRoundedIcon />
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
                      props.deleteChat();
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
                onClick={() => {
                  setShowWebcam(false);
                  setCircularProgress(true);
                }}
              >
                <CloseOutlinedIcon className={classes.webcamCloseIcon} />
              </IconButton>
              <h3>Take Photo</h3>
            </div>
            {!circularProgress ? (
              <>
                <Webcam className="webcam" ref={webcamRef} />
                <CameraAltRoundedIcon
                  className={classes.webcamCameraIcon}
                  onClick={clickImage}
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
              // console.log(getPreviousMessageDate(index));
              // console.log(getTimeAgo(index));
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
                        <p>{getTimeAgo(index)}</p>
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
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {emojiBox && (
        <EmojiPicker
          onEmojiClick={(event, emojiObject) => {
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

      {gifBox && (
        <Tenor
          defaultResults={true}
          limit={1000}
          searchPlaceholder="Search GIFs via Tenor"
          onSelect={selectGif}
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
            onClick={() => {
              props.setSelectMessagesUI(false);
              props.setSelectedMessages([]);
            }}
          >
            <CloseOutlinedIcon className={classes.icon} />
          </IconButton>
          <p>{`${props.selectedMessages.length} selected`}</p>
          <IconButton
            onClick={props.starMessages}
            disabled={props.selectedMessages.length === 0 ? true : false}
          >
            <StarRateRoundedIcon className={classes.icon} />
          </IconButton>

          <IconButton
            onClick={props.deleteSelectedMessages}
            disabled={props.selectedMessages.length === 0 ? true : false}
          >
            <DeleteRoundedIcon className={classes.icon} />
          </IconButton>

          <IconButton
            disabled={props.selectedMessages.length === 0 ? true : false}
            onClick={() => handleOpenModal()}
          >
            <ShortcutIcon className={classes.icon} />
          </IconButton>
        </div>
      ) : (
        <div className="chat-footer">
          {closeButton && (
            <IconButton
              className={classes.icon}
              onClick={() => {
                setEmojiBox(false);
                setCloseButton(!closeButton);
                setGifButton(false);
                setGifBox(false);
                sendMessageRef.current.focus();
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
              setSendMediaList(false);
              setGifBox(false);
              sendMessageRef.current.focus();
            }}
          >
            <InsertEmoticonOutlinedIcon />
          </IconButton>

          {gifButton && (
            <IconButton
              className={classes.icon}
              onClick={() => {
                setGifBox(true);
                setEmojiBox(false);
              }}
            >
              <GifBoxOutlinedIcon />
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
                    <IconButton onClick={() => inputImagesRef.current.click()}>
                      <InsertPhotoIcon className={classes.mediaIcon} />
                      <input
                        accept="image/*"
                        type="file"
                        multiple=""
                        style={{ display: "none" }}
                        ref={inputImagesRef}
                        onChange={selectFiles}
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
                    <IconButton onClick={() => inputVideosRef.current.click()}>
                      <VideoCameraBackIcon className={classes.mediaIcon} />
                      <input
                        accept="video/mp4,video/3gpp,video/quicktime"
                        type="file"
                        multiple=""
                        style={{ display: "none" }}
                        ref={inputVideosRef}
                        onChange={selectFiles}
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
                      onClick={() => inputDocumentRef.current.click()}
                    >
                      <InsertDriveFileIcon className={classes.mediaIcon} />
                      <input
                        accept="*"
                        type="file"
                        multiple=""
                        style={{ display: "none" }}
                        ref={inputDocumentRef}
                        onChange={selectFiles}
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
                      onClick={() => {
                        setShowWebcam(!showWebcam);
                        setSendMediaList(!sendMediaList);
                        setTimeout(() => {
                          setCircularProgress(false);
                        }, 1500);
                      }}
                    >
                      <CameraAltRoundedIcon className={classes.mediaIcon} />
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            )}
            <IconButton
              className={classes.icon}
              onClick={() => setSendMediaList(!sendMediaList)}
              style={{ transform: "rotate(45deg)" }}
            >
              <AttachFileOutlinedIcon />
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

          <IconButton className={classes.icon}>
            <MicOutlinedIcon />
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

import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import "../../styles/chat.css";
import {
  ToggleContactInfoContext,
  UserContext,
  ChatBackgroundContext,
} from "../../contexts/Context";
import ForwardMessageModal from "../ForwardMessageModal";

// MUI components
import { IconButton } from "@material-ui/core";

// Material icons
import * as Icons from "../Icons";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

import "react-tenor/dist/styles.css";
import chatDoodle from "../../assets/images/chat-doodle.png";

import { getMessages } from "../../utils/getMessages";
import { sendMessageToDatabase } from "../../utils/sendMessageToDatabase";
import { deleteSelectedMessages } from "../../utils/deleteSelectedMessages";
import { starMessages } from "../../utils/starMessages";
import { markMessageAsread } from "../../utils/markMessageAsRead";
import { handleTyping } from "../../utils/typing";
import EmojiPickerComponent from "./EmojiPickerComponent";
import GifPickerComponent from "./GifPickerComponent";
import WebcamComponents from "./WebcamComponents";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import SelectMessagesUI from "./SelectMessagesUI";
import FirebaseRefs from "../FirebaseRefs";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
  })
);

function Chat(props) {
  // MUI Styles
  const classes = useStyles();

  // Ref
  const sendMessageRef = useRef(null);
  const chatBox = useRef(null);

  // Use state
  const [emojiBox, setEmojiBox] = useState(false);
  const [typing, setTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState();
  const [chatWallpaper, setChatWallpaper] = useState("");
  const [showWebcam, setShowWebcam] = useState(false);
  const [gifBox, setGifBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [circularProgress, setCircularProgress] = useState(true);

  // Contexts
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const currentUser = useContext(UserContext);
  const { chatBackground, doodle } = useContext(ChatBackgroundContext);

  // Firebase refs
  const firebaseRef = FirebaseRefs(props.emailId, currentUser);

  // Get users from database
  const getUser = useCallback(() => {
    firebaseRef.chatUserRef.onSnapshot((snapshot) =>
      props.setChatUser(snapshot.data())
    );
    // eslint-disable-next-line
  }, [props.chatUser]);

  // Check blocked user
  const checkBlockedUser = useCallback(() => {
    firebaseRef.blockedUserCollectionRef.onSnapshot((snapshot) => {
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
    firebaseRef.chatUserRef.onSnapshot((snapshot) =>
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
      currentUser,
      props.emailId,
      props.setStarredMessages,
      props.setChatMessages
    );
    // eslint-disable-next-line
  }, [props.emailId]);

  useEffect(() => {
    // Focus send message input
    if (
      showWebcam === false &&
      props.selectMessagesUI === false &&
      props.block.length === 0
    ) {
      sendMessageRef.current.focus();
    }

    // Mark messages as read when chat component loads
    markMessageAsread(props.emailId, currentUser);
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
    handleTyping(typing, props.emailId, currentUser);
    // eslint-disable-next-line
  }, [typing]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser([]);
  };

  return (
    <div className="chat">
      <ChatHeader
        lastSeen={lastSeen}
        closeChat={closeChat}
        chatUser={props.chatUser}
        selectMessagesUI={props.selectMessagesUI}
        setSelectMessagesUI={props.setSelectMessagesUI}
        emailId={props.emailId}
        currentUser={currentUser}
        message={props.message}
        chatMessages={props.chatMessages}
        setChat={props.setChat}
      />

      <div
        className="chat-body"
        ref={chatBox}
        style={{
          backgroundColor: `${chatBackground}`,
          backgroundImage: `url(${chatWallpaper}`,
        }}
      >
        {showWebcam ? (
          <WebcamComponents
            setShowWebcam={setShowWebcam}
            circularProgress={circularProgress}
            setCircularProgress={setCircularProgress}
            sendMessageToDatabase={sendMessageToDatabase}
            emailId={props.emailId}
            chatUser={props.chatUser}
            message={props.message}
            chatMessages={props.chatMessages}
          />
        ) : (
          <div className="chat-body-inner-container">
            {props.chatMessages.map((message, index) => {
              return (
                <SelectMessagesUI
                  key={index}
                  message={message}
                  index={index}
                  chatMessages={props.chatMessages}
                  selectMessagesUI={props.selectMessagesUI}
                  selectedMessages={props.selectedMessages}
                  setSelectedMessages={props.setSelectedMessages}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Emoji box */}
      {emojiBox && (
        <EmojiPickerComponent
          message={props.message}
          setMessage={props.setMessage}
          sendMessageRef={sendMessageRef}
        />
      )}

      {/* Gif picker */}
      {gifBox && (
        <GifPickerComponent
          emailId={props.emailId}
          chatUser={props.chatUser}
          message={props.message}
          chatMessages={props.chatMessages}
          sendMessageToDatabase={sendMessageToDatabase}
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
            onClick={() =>
              starMessages(props.selectedMessages, props.emailId, currentUser)
            }
            disabled={props.selectedMessages.length === 0 ? true : false}
          >
            <Icons.StarRateRoundedIcon className={classes.icon} />
          </IconButton>

          <IconButton
            aria-label="delete-messages"
            onClick={() =>
              deleteSelectedMessages(
                props.selectedMessages,
                props.chatMessages,
                props.setSelectMessagesUI,
                props.setSelectedMessages,
                props.emailId,
                currentUser
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
        <ChatFooter
          emojiBox={emojiBox}
          setEmojiBox={setEmojiBox}
          setGifBox={setGifBox}
          setTyping={setTyping}
          showWebcam={showWebcam}
          setShowWebcam={setShowWebcam}
          setCircularProgress={setCircularProgress}
          sendMessageRef={sendMessageRef}
          sendMessageToDatabase={sendMessageToDatabase}
          emailId={props.emailId}
          chatUser={props.chatUser}
          message={props.message}
          chatMessages={props.chatMessages}
          setMessage={props.setMessage}
          block={props.block}
        />
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

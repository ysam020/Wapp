import * as React from "react";
import "../../styles/chat.css";
import * as Context from "../../contexts/Context";
import ForwardMessageModal from "../ForwardMessageModal";

// MUI components
import { IconButton } from "@material-ui/core";

// Material icons
import * as Icons from "../Icons";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Components
import EmojiPickerComponent from "./EmojiPickerComponent";
import GifPickerComponent from "./GifPickerComponent";
import WebcamComponents from "./WebcamComponents";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import SelectMessagesUI from "./SelectMessagesUI";
import FirebaseRefs from "../FirebaseRefs";

// utils
import { getMessages } from "../../utils/getMessages";
import { deleteSelectedMessages } from "../../utils/deleteSelectedMessages";
import { starMessages } from "../../utils/starMessages";
import { markMessageAsread } from "../../utils/markMessageAsRead";
import { handleTyping } from "../../utils/typing";
import { getUser } from "../../utils/getUser";
import { checkBlockedUser } from "../../utils/checkBlockedUser";

import "react-tenor/dist/styles.css";
import chatDoodle from "../../assets/images/chat-doodle.png";

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
  const sendMessageRef = React.useRef(null);
  const chatBox = React.useRef(null);

  // Use state
  const [emojiBox, setEmojiBox] = React.useState(false);
  const [typing, setTyping] = React.useState(false);
  const [lastSeen, setLastSeen] = React.useState();
  const [chatWallpaper, setChatWallpaper] = React.useState("");
  const [showWebcam, setShowWebcam] = React.useState(false);
  const [gifBox, setGifBox] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [circularProgress, setCircularProgress] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState([]);
  const [chatUser, setChatUser] = React.useState({});
  const [selectedMessages, setSelectedMessages] = React.useState([]);
  const [selectMessagesUI, setSelectMessagesUI] = React.useState(false);

  // Contexts
  const toggleContactInfoContext = React.useContext(
    Context.ToggleContactInfoContext
  );
  const currentUser = React.useContext(Context.UserContext);
  const { chatBackground, doodle } = React.useContext(
    Context.ChatBackgroundContext
  );
  const emailId = React.useContext(Context.EmailContext);

  // Firebase refs
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  React.useEffect(() => {
    getUser(emailId, currentUser, setChatUser);
    checkBlockedUser(emailId, currentUser, props.setBlock, chatUser);

    // Get last online time
    firebaseRef.chatUserRef.onSnapshot((snapshot) =>
      setLastSeen(snapshot.data().lastOnline)
    );

    // eslint-disable-next-line
  }, [
    chatMessages,
    chatUser.email,
    emailId,
    props.setBlock,

    // setChatUser,
  ]);

  React.useEffect(() => {
    getMessages(
      currentUser,
      emailId,
      props.setStarredMessages,
      setChatMessages
    );
    // eslint-disable-next-line
  }, [emailId]);

  React.useEffect(() => {
    // Focus send message input
    if (
      showWebcam === false &&
      selectMessagesUI === false &&
      props.block.length === 0
    ) {
      sendMessageRef.current.focus();
    }

    // Mark messages as read when chat component loads
    markMessageAsread(emailId, currentUser);
  });

  // Scroll to bottom of chat when message is sent or received
  React.useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]); // Run each time chatMessages is update

  // Close chat function
  const closeChat = () => {
    toggleContactInfoContext.toggleContactInfoDispatch("hide");
    props.setChat(false);
    localStorage.removeItem("chat");
  };

  // Wallpaper doodles
  React.useEffect(() => {
    if (doodle) {
      setChatWallpaper(chatDoodle);
    } else {
      setChatWallpaper("");
    }
  }, [doodle]);

  React.useEffect(() => {
    handleTyping(typing, emailId, currentUser);
    // eslint-disable-next-line
  }, [typing]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser([]);
  };

  return (
    <Context.ChatDetailsContext.Provider
      value={{
        emojiBox: emojiBox,
        setEmojiBox: setEmojiBox,
        typing: typing,
        setTyping: setTyping,
        lastSeen: lastSeen,
        setLastSeen: setLastSeen,
        showWebcam: showWebcam,
        setShowWebcam: setShowWebcam,
        gifBox: gifBox,
        setGifBox: setGifBox,
        openModal: openModal,
        setOpenModal: setOpenModal,
        selectedUser: selectedUser,
        setSelectedUser: setSelectedUser,
        circularProgress: circularProgress,
        setCircularProgress: setCircularProgress,
        message: message,
        setMessage: setMessage,
        chatMessages: chatMessages,
        setChatMessages: setChatMessages,
        chatUser: chatUser,
        setChatUser: setChatUser,
        selectedMessages: selectedMessages,
        setSelectedMessages: setSelectedMessages,
        selectMessagesUI: selectMessagesUI,
        setSelectMessagesUI: setSelectMessagesUI,
        closeChat: closeChat,
        setChat: props.setChat,
        sendMessageRef: sendMessageRef,
        block: props.block,
        handleCloseModal: handleCloseModal,
      }}
    >
      <div className="chat">
        <ChatHeader />

        <div
          className="chat-body"
          ref={chatBox}
          style={{
            backgroundColor: `${chatBackground}`,
            backgroundImage: `url(${chatWallpaper}`,
          }}
        >
          {showWebcam ? (
            <WebcamComponents />
          ) : (
            <div className="chat-body-inner-container">
              {chatMessages.map((message, index) => {
                return (
                  <SelectMessagesUI
                    key={index}
                    message={message}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Emoji box */}
        {emojiBox && <EmojiPickerComponent />}

        {/* Gif picker */}
        {gifBox && <GifPickerComponent />}

        {showWebcam === false && props.block.length !== 0 ? (
          <div className="chat-footer-blocked">
            <p>Cant send message to a blocked contact {chatUser.email}</p>
          </div>
        ) : showWebcam === true ? (
          ""
        ) : showWebcam === false &&
          props.block.length === 0 &&
          selectMessagesUI === true ? (
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="chat-footer"
          >
            <IconButton
              aria-label="close"
              onClick={() => {
                setSelectMessagesUI(false);
                setSelectedMessages([]);
              }}
            >
              <Icons.CloseOutlinedIcon className={classes.icon} />
            </IconButton>
            <p>{`${selectedMessages.length} selected`}</p>
            <IconButton
              aria-label="star-messages"
              onClick={() =>
                starMessages(selectedMessages, emailId, currentUser)
              }
              disabled={selectedMessages.length === 0 ? true : false}
            >
              <Icons.StarRateRoundedIcon className={classes.icon} />
            </IconButton>

            <IconButton
              aria-label="delete-messages"
              onClick={() =>
                deleteSelectedMessages(
                  selectedMessages,
                  chatMessages,
                  setSelectMessagesUI,
                  setSelectedMessages,
                  emailId,
                  currentUser
                )
              }
              disabled={selectedMessages.length === 0 ? true : false}
            >
              <Icons.DeleteRoundedIcon className={classes.icon} />
            </IconButton>

            <IconButton
              aria-label="forward-messages"
              disabled={selectedMessages.length === 0 ? true : false}
              onClick={() => handleOpenModal()}
            >
              <Icons.ShortcutIcon className={classes.icon} />
            </IconButton>
          </div>
        ) : (
          <ChatFooter />
        )}

        <ForwardMessageModal />
      </div>
    </Context.ChatDetailsContext.Provider>
  );
}

export default React.memo(Chat);

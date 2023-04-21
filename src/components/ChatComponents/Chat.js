import * as React from "react";
import "../../styles/chat.css";
import * as Context from "../../contexts/Context";

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
import ForwardMessageModal from "../ForwardMessageModal";

// utils
import { deleteSelectedMessages } from "../../utils/deleteSelectedMessages";
import { starMessages } from "../../utils/starMessages";
import { markMessageAsread } from "../../utils/markMessageAsRead";

// Custom hooks
import useContexts from "../../customHooks/contexts";
import useGetMessages from "../../customHooks/getMessages";
import useChatUser from "../../customHooks/chatUser";
import useChatWallpaper from "../../customHooks/chatWallpaper";
import useWebcam from "../../customHooks/webcam";
import useScrollToBottom from "../../customHooks/scrollToBottom";
import useHandleTyping from "../../customHooks/handleTyping";

import "react-tenor/dist/styles.css";

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

  // Use state
  const [emojiBox, setEmojiBox] = React.useState(false);
  const [gifBox, setGifBox] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [circularProgress, setCircularProgress] = React.useState(true);
  const [message, setMessage] = React.useState("");
  const [selectedMessages, setSelectedMessages] = React.useState([]);

  // Contexts
  const { currentUser, emailId, chatBackground, toggleContactInfoDispatch } =
    useContexts();

  // Custom hooks
  const { chatMessages, setChatMessages } = useGetMessages(
    props.setStarredMessages
  );

  const { chatUser, setChatUser, lastSeen, setLastSeen } = useChatUser(
    props.setBlock,
    chatMessages
  );

  const { chatWallpaper } = useChatWallpaper();
  const {
    showWebcam,
    setShowWebcam,
    selectMessagesUI,
    setSelectMessagesUI,
    sendMessageRef,
  } = useWebcam(props.block);

  const { chatBox } = useScrollToBottom(chatMessages);
  const { typing, setTyping } = useHandleTyping(chatMessages);

  // Mark messages as read when chat component loads
  React.useEffect(() => {
    markMessageAsread(emailId, currentUser);
  }, [emailId, currentUser]);

  // Close chat function
  const closeChat = () => {
    toggleContactInfoDispatch("hide");
    props.setChat(false);
    localStorage.removeItem("chat");
  };

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
              onClick={() => setOpenModal(true)}
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

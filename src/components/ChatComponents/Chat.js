import * as React from "react";
import * as Context from "../../contexts/Context";
import * as Icons from "../Icons";
import { IconButton } from "@material-ui/core";
// Styles
import "react-tenor/dist/styles.css";
import "../../styles/chat.css";
// Components
import EmojiPickerComponent from "./EmojiPickerComponent";
import GifPickerComponent from "./GifPickerComponent";
import WebcamComponents from "./WebcamComponents";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import SelectMessagesUI from "./SelectMessagesUI";
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

///////////////////////////////////////////////////////////////////
function Chat(props) {
  // Use state
  const [emojiBox, setEmojiBox] = React.useState(false); // emoji picker state
  const [gifBox, setGifBox] = React.useState(false); // gif picker state
  const [message, setMessage] = React.useState(""); // message typed by the user
  const [selectedMessages, setSelectedMessages] = React.useState([]); // selected messages to delete
  const [circularProgress, setCircularProgress] = React.useState(true);

  // Custom hooks
  const { currentUser, emailId, chatBackground, toggleContactInfoDispatch } =
    useContexts();

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

        {/* User is blocked and webcam is not displayed */}
        {showWebcam === false && props.block.length !== 0 ? (
          <div className="chat-footer-blocked">
            <p>Cant send message to a blocked contact {chatUser.email}</p>
          </div>
        ) : // User is blocked and webcam is displayed
        showWebcam === true ? (
          ""
        ) : // User is not blocked and webcam is not displayed and select message UI is displayed
        showWebcam === false &&
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
              <Icons.CloseOutlinedIcon color="primary" />
            </IconButton>
            <p>{`${selectedMessages.length} selected`}</p>
            <IconButton
              aria-label="star-messages"
              onClick={() =>
                starMessages(selectedMessages, emailId, currentUser)
              }
              disabled={selectedMessages.length === 0 ? true : false}
            >
              <Icons.StarRateRoundedIcon color="primary" />
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
              <Icons.DeleteRoundedIcon color="primary" />
            </IconButton>

            <IconButton aria-label="forward-messages">
              <Icons.ShortcutIcon color="primary" />
            </IconButton>
          </div>
        ) : (
          // User is not blocked, webcam is not displayed and select message UI is not displayed
          <ChatFooter />
        )}
      </div>
    </Context.ChatDetailsContext.Provider>
  );
}

export default React.memo(Chat);

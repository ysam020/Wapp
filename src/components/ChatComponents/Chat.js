import * as React from "react";
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
import * as Icons from "../Icons";
import { IconButton } from "@material-ui/core";
import Box from "@mui/material/Box";
import useRightSidebarPanels from "../../customHooks/rightSidebarPanel";
// utils
import { deleteSelectedMessages } from "../../utils/deleteSelectedMessages";
import { starMessages } from "../../utils/starMessages";
import { markMessageAsread } from "../../utils/markMessageAsRead";
// Contexts
import * as Context from "../../contexts/Context";
// Custom hooks
import useContexts from "../../customHooks/contexts";
import useGetMessages from "../../customHooks/getMessages";
import useChatWallpaper from "../../customHooks/chatWallpaper";
import useWebcam from "../../customHooks/webcam";
import FirebaseRefs from "../../components/FirebaseRefs";
import { checkBlockedUser } from "../../utils/checkBlockedUser";

///////////////////////////////////////////////////////////////////
function Chat(props) {
  const drawerWidth = 400;

  // Use state
  const [emojiBox, setEmojiBox] = React.useState(false); // emoji picker state
  const [gifBox, setGifBox] = React.useState(false); // gif picker state
  const [message, setMessage] = React.useState(""); // message typed by the user
  const [selectedMessages, setSelectedMessages] = React.useState([]); // selected messages to delete
  const [circularProgress, setCircularProgress] = React.useState(true);
  const [block, setBlock] = React.useState([]);
  const [lastSeen, setLastSeen] = React.useState();
  const [starredMessages, setStarredMessages] = React.useState([]);

  // Custom hooks
  const { currentUser, chatBackground } = useContexts();
  const { chatMessages, setChatMessages } = useGetMessages(
    setStarredMessages,
    props.chatUser.email
  );
  const { rightSidebarPanels, toggleDrawer } = useRightSidebarPanels(
    drawerWidth,
    props.setChat,
    block,
    starredMessages
  );

  const { chatWallpaper } = useChatWallpaper();
  const {
    showWebcam,
    setShowWebcam,
    selectMessagesUI,
    setSelectMessagesUI,
    sendMessageRef,
  } = useWebcam(block);

  // Mark messages as read when chat component loads
  React.useEffect(() => {
    if (chatMessages.length > 0) {
      markMessageAsread(props.chatUser.email, currentUser);
    }
    // eslint-disable-next-line
  }, [props.chatUser.email, chatMessages]);

  // Close chat function
  const closeChat = () => {
    props.setChat(false);
    localStorage.removeItem("chat");
  };

  // Firebase refs
  const firebaseRef = props.chatUser.email
    ? FirebaseRefs(props.chatUser.email, currentUser)
    : "";

  React.useEffect(() => {
    if (props.chatUser.email) {
      checkBlockedUser(props.chatUser.email, currentUser, setBlock);

      // Get last online time
      firebaseRef.chatUserRef.onSnapshot((snapshot) =>
        setLastSeen(snapshot.data().lastOnline)
      );
    }

    // eslint-disable-next-line
  }, [
    chatMessages,
    props.chatUser.email,
    props.chatUser.email,
    setBlock,

    // setChatUser,
  ]);

  return (
    <Context.ChatDetailsContext.Provider
      value={{
        emojiBox: emojiBox,
        setEmojiBox: setEmojiBox,
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
        chatUser: props.chatUser,
        setChatUser: props.setChatUser,
        selectedMessages: selectedMessages,
        setSelectedMessages: setSelectedMessages,
        selectMessagesUI: selectMessagesUI,
        setSelectMessagesUI: setSelectMessagesUI,
        closeChat: closeChat,
        chat: props.chat,
        setChat: props.setChat,
        sendMessageRef: sendMessageRef,
        block: block,
      }}
    >
      <div className="chat">
        {/* Chat header */}
        <ChatHeader toggleDrawer={toggleDrawer} />

        {/* Chat body */}
        <div
          className="chat-body"
          style={{
            backgroundColor: `${chatBackground}`,
            backgroundImage: `url(${chatWallpaper}`,
          }}
        >
          {/* Emoji box */}
          <div
            className={emojiBox || gifBox ? "picker-box-active" : "picker-box"}
          >
            {emojiBox && <EmojiPickerComponent />}

            {/* Gif picker */}
            {gifBox && <GifPickerComponent />}
          </div>

          {/* If webcam is displayed */}
          {showWebcam ? (
            <WebcamComponents />
          ) : (
            <>
              {/* If webcam is not displayed */}
              <div style={{ flexGrow: 1 }}></div>
              {chatMessages.map((message, index) => {
                return (
                  <SelectMessagesUI
                    key={index}
                    message={message}
                    index={index}
                  />
                );
              })}
            </>
          )}
        </div>

        {/* User is blocked and webcam is not displayed */}
        {showWebcam === false && block.length !== 0 ? (
          <div className="chat-footer-blocked">
            <p>Cant send message to a blocked contact {props.chatUser.email}</p>
          </div>
        ) : // User is blocked and webcam is displayed
        showWebcam === true ? (
          ""
        ) : // User is not blocked and webcam is not displayed and select message UI is displayed
        showWebcam === false &&
          block.length === 0 &&
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
                starMessages(
                  selectedMessages,
                  props.chatUser.email,
                  currentUser
                )
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
                  props.chatUser.email,
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

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {rightSidebarPanels}
        </Box>
      </div>
    </Context.ChatDetailsContext.Provider>
  );
}

export default React.memo(Chat);

import React, { useCallback, useContext, useEffect, useState } from "react";
import "../styles/home.css";
import "../styles/chatpage.css";
import Sidebar from "../components/Sidebar";
import SidebarProfile from "../components/SidebarProfile";
import Communities from "../components/Communities";
import NewChat from "../components/NewChat";
import Settings from "../components/SettingsComponents/Settings";
import Notifications from "../components/SettingsComponents/Notifications";
import Privacy from "../components/SettingsComponents/Privacy";
import Security from "../components/SettingsComponents/Security";
import ChatWallpaper from "../components/SettingsComponents/ChatWallpaper";
import AccountInfo from "../components/SettingsComponents/AccountInfo";
import Help from "../components/SettingsComponents/Help";
import Chat from "../components/ChatComponents/Chat";
import ContactInfo from "../components/ContactInfo";
import DisappearingMessages from "../components/DisappearingMessages";
import SearchMessage from "../components/SearchMessage";
import StarredMessages from "../components/StarredMessages";
import Encryption from "../components/Encryption";
import {
  UserContext,
  ToggleSidebarProfileContext,
  ToggleSettingsContext,
  ToggleSidebarContext,
  SettingsNotificationContext,
  SettingsPrivacyContext,
  SettingsSecurityContext,
  SettingsAccountInfoContext,
  SettingsHelpContext,
  ToggleChatWallpaperContext,
  NewChatContext,
  CommunitiesContext,
  ToggleContactInfoContext,
  SearchMessageContext,
  EncryptionContext,
  DisappearingMessagesContext,
  StarredMessageContext,
} from "../contexts/Context";
import db from "../firebase";
import firebase from "firebase/app";
import * as Icons from "../components/Icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import cryptoRandomString from "crypto-random-string";
import { sendMessageToDatabase } from "../utils/sendMessageToDatabase";
import WappSVG from "../components/WappSVG";

const useStyles = makeStyles((theme) =>
  createStyles({
    lockIcon: {
      color: "#8696a0",
      width: "18px !important",
      height: "18px !important",
    },
  })
);

function Home() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleSidebarProfileContext = useContext(ToggleSidebarProfileContext);
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);
  const settingsNotificationContext = useContext(SettingsNotificationContext);
  const settingsPrivacyContext = useContext(SettingsPrivacyContext);
  const settingsSecurityContext = useContext(SettingsSecurityContext);
  const settingsAccountInfoContext = useContext(SettingsAccountInfoContext);
  const settingsHelpContext = useContext(SettingsHelpContext);
  const toggleChatWallpaperContext = useContext(ToggleChatWallpaperContext);
  const newChatContext = useContext(NewChatContext);
  const communitiesContext = useContext(CommunitiesContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const encryptionContext = useContext(EncryptionContext);
  const disappearingMessagesContext = useContext(DisappearingMessagesContext);
  const starredMessageContext = useContext(StarredMessageContext);

  // useState
  const [emailId, setEmailId] = useState(
    JSON.parse(localStorage.getItem("chat"))
  );
  const [chat, setChat] = useState(emailId ? true : false);
  const [chatPopover, setChatPopover] = useState(false);
  const [message, setMessage] = useState("");
  const [block, setBlock] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const [selectMessagesUI, setSelectMessagesUI] = useState(false);

  if (emailId) {
    var senderMessageCollectionRef = db
      .collection("chats")
      .doc(currentUser.email)
      .collection("messages");

    var receiverMessageCollectionRef = db
      .collection("chats")
      .doc(emailId)
      .collection("messages");

    var senderFriendListRef = db
      .collection("FriendList")
      .doc(currentUser.email)
      .collection("list")
      .doc(emailId);

    var receiverFriendListRef = db
      .collection("FriendList")
      .doc(emailId)
      .collection("list")
      .doc(currentUser.email);
  }

  // Update last online in user collection
  useEffect(() => {
    db.collection("users")
      .doc(currentUser.email)
      .update({ lastOnline: firebase.firestore.Timestamp.now() });
  }, [currentUser.email]);

  // Send Message
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      let randomString = cryptoRandomString({ length: 10 });

      if (block.length === 0 && message.length !== 0 && emailId) {
        let payload = {
          text: message,
          messageId: randomString,
          messageInfo: "string",
          senderEmail: currentUser.email,
          receiverEmail: emailId,
          timestamp: firebase.firestore.Timestamp.now(),
          read: false,
        };

        sendMessageToDatabase(
          payload,
          senderMessageCollectionRef,
          receiverMessageCollectionRef,
          senderFriendListRef,
          receiverFriendListRef,
          chatUser,
          message,
          currentUser,
          chatMessages,
          emailId
        );
      }

      setMessage("");
    },
    // eslint-disable-next-line
    [message]
  );

  // Chat Popover
  const handleChatPopover = () => {
    setChatPopover(!chatPopover);
  };

  // Close chat popover if clicked outside
  const handleClickAway = () => {
    setChatPopover(!chatPopover);
  };

  return (
    <div className="home">
      <div className="home-container">
        {toggleSidebarContext.toggleSidebarState && (
          <Sidebar
            setChat={setChat}
            emailId={emailId}
            setEmailId={setEmailId}
          />
        )}

        {toggleSidebarProfileContext.toggleSidebarProfileState && (
          <SidebarProfile />
        )}
        {communitiesContext.communitiesState && <Communities />}
        {newChatContext.newChatState && (
          <NewChat setChat={setChat} setEmailId={setEmailId} />
        )}

        {toggleSettingsContext.toggleSettingsState && <Settings />}

        {settingsNotificationContext.settingsNotificationState && (
          <Notifications />
        )}
        {settingsPrivacyContext.settingsPrivacyState && <Privacy />}
        {settingsSecurityContext.settingsSecurityState && <Security />}
        {settingsAccountInfoContext.settingsAccountInfoState && <AccountInfo />}
        {settingsHelpContext.settingsHelpState && <Help />}
        {toggleChatWallpaperContext.toggleChatWallpaperState && (
          <ChatWallpaper />
        )}

        {chat && emailId !== "" ? (
          <div className="chatpage">
            <div className="chatpage-container">
              <Chat
                chatPopover={chatPopover}
                handleChatPopover={handleChatPopover}
                handleClickAway={handleClickAway}
                message={message}
                setMessage={setMessage}
                chatMessages={chatMessages}
                chatUser={chatUser}
                setChatUser={setChatUser}
                block={block}
                setBlock={setBlock}
                sendMessage={sendMessage}
                setChatMessages={setChatMessages}
                setStarredMessages={setStarredMessages}
                sendMessageToDatabase={sendMessageToDatabase}
                selectedMessages={selectedMessages}
                setSelectedMessages={setSelectedMessages}
                emailId={emailId}
                setChat={setChat}
                selectMessagesUI={selectMessagesUI}
                setSelectMessagesUI={setSelectMessagesUI}
              />

              {toggleContactInfoContext.toggleContactInfoState && (
                <ContactInfo
                  emailId={emailId}
                  block={block}
                  setBlock={setBlock}
                  setChat={setChat}
                />
              )}
              {encryptionContext.encryptionState && <Encryption />}
              {disappearingMessagesContext.disappearingMessagesState && (
                <DisappearingMessages />
              )}
              {searchMessageContext.searchMessageState && (
                <SearchMessage emailId={emailId} />
              )}
              {starredMessageContext.starredMessageState && (
                <StarredMessages
                  starredMessages={starredMessages}
                  setStarredMessages={setStarredMessages}
                  emailId={emailId}
                  currentUser={currentUser}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="home-bg">
            <div className="home-body">
              <WappSVG />

              <h1>Wapp web</h1>
              <p>
                Send and receive messages without keeping your phone online.
              </p>
              <p>
                Use Wapp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>

            <div className="home-footer">
              <Icons.LockIcon className={classes.lockIcon} />
              <p>End-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Home);

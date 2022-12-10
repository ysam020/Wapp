import React, { useState, useContext } from "react";
import "../styles/chatpage.css";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarProfile from "../components/SidebarProfile.tsx";
import Chat from "../components/Chat";
import ContactInfo from "../components/ContactInfo";
import Settings from "../components/SettingsComponents/Settings";
import Notifications from "../components/SettingsComponents/Notifications";
import Privacy from "../components/SettingsComponents/Privacy";
import Security from "../components/SettingsComponents/Security";
import AccountInfo from "../components/SettingsComponents/AccountInfo";
import Help from "../components/SettingsComponents/Help";
import SearchMessage from "../components/SearchMessage";
import firebase from "firebase/app";
import db from "../firebase";
import {
  ToggleSidebarProfileContext,
  ToggleSettingsContext,
  ToggleSidebarContext,
  SettingsNotificationContext,
  SettingsPrivacyContext,
  SettingsSecurityContext,
  SettingsAccountInfoContext,
  SettingsHelpContext,
  ToggleContactInfoContext,
  SearchMessageContext,
  UserContext,
} from "../contexts/Context";

function ChatPage() {
  const [chatPopover, setChatPopover] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [message, setMessage] = useState("");
  const [block, setBlock] = useState([]);
  const [chatUser, setChatUser] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState();
  const [searchedMessage, setSearchedMessage] = useState([]);

  // Contexts
  const toggleSidebarProfileContext = useContext(ToggleSidebarProfileContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);
  const settingsNotificationContext = useContext(SettingsNotificationContext);
  const settingsPrivacyContext = useContext(SettingsPrivacyContext);
  const settingsSecurityContext = useContext(SettingsSecurityContext);
  const settingsAccountInfoContext = useContext(SettingsAccountInfoContext);
  const settingsHelpContext = useContext(SettingsHelpContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);

  // Get email id from url
  const { emailId } = useParams();

  // Send Message
  const sendMessage = (e) => {
    e.preventDefault();
    if (block.length === 0 && message.length !== 0) {
      if (emailId) {
        let payload = {
          text: message,
          senderEmail: currentUser.email,
          receiverEmail: emailId,
          timestamp: firebase.firestore.Timestamp.now(),
        };

        //Add message to chat collection for sender
        db.collection("chats")
          .doc(currentUser.email)
          .collection("messages")
          .add(payload);

        //Add message to chat collection for receiver
        db.collection("chats").doc(emailId).collection("messages").add(payload);

        // Add friend in FriendList collection for sender
        db.collection("FriendList")
          .doc(currentUser.email)
          .collection("list")
          .doc(emailId)
          .set({
            email: chatUser.email,
            fullname: chatUser.fullname,
            photoURL: chatUser.photoURL,
            lastMessage: message,
            timestamp: firebase.firestore.Timestamp.now(),
          });

        // Add friend in FriendList collection for receiver
        db.collection("FriendList")
          .doc(emailId)
          .collection("list")
          .doc(currentUser.email)
          .set({
            email: currentUser.email,
            fullname: currentUser.fullname,
            photoURL: currentUser.photoURL,
            lastMessage: message,
            timestamp: firebase.firestore.Timestamp.now(),
          });
      }
    }

    setMessage("");
  };

  // Get chats from database
  const getMessages = async () => {
    db.collection("chats")
      .doc(emailId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());

        setLastMessageTime(
          messages.slice(-1)[0].timestamp.toDate().toGMTString("en-US")
        );

        // Filter chats where either sender email or receiver email matches the sender or receiver email in chat database
        let newMessage = messages.filter(
          (message) =>
            message.senderEmail === (currentUser.email || emailId) ||
            message.receiverEmail === (currentUser.email || emailId)
        );

        setSearchedMessage(
          newMessage.filter((searchTerm) => {
            if (searchInput) {
              if (searchTerm.text.includes(searchInput)) {
                return searchTerm;
              }
            }
          })
        );

        setChatMessages(newMessage);
      });
  };

  // Chat Popover
  const handleChatPopover = () => {
    setChatPopover(!chatPopover);
  };

  // Close chat popover if clicked outside
  const handleClickAway = () => {
    setChatPopover(false);
  };

  return (
    <div className="chatpage">
      <div className="chatpage-container">
        {toggleSidebarContext.toggleSidebarState && <Sidebar />}

        {toggleSidebarProfileContext.toggleSidebarProfileState && (
          <SidebarProfile />
        )}

        {toggleSettingsContext.toggleSettingsState && <Settings />}
        {settingsNotificationContext.settingsNotificationState && (
          <Notifications />
        )}
        {settingsPrivacyContext.settingsPrivacyState && <Privacy />}
        {settingsSecurityContext.settingsSecurityState && <Security />}
        {settingsAccountInfoContext.settingsAccountInfoState && <AccountInfo />}
        {settingsHelpContext.settingsHelpState && <Help />}

        <Chat
          chatPopover={chatPopover}
          handleChatPopover={handleChatPopover}
          handleClickAway={handleClickAway}
          searchInput={searchInput}
          message={message}
          setMessage={setMessage}
          chatMessages={chatMessages}
          lastMessageTime={lastMessageTime}
          chatUser={chatUser}
          setChatUser={setChatUser}
          block={block}
          setBlock={setBlock}
          sendMessage={sendMessage}
          getMessages={getMessages}
        />

        {toggleContactInfoContext.toggleContactInfoState && <ContactInfo />}
        {searchMessageContext.searchMessageState && (
          <SearchMessage
            searchMessage={searchInput}
            setSearchInput={setSearchInput}
            searchedMessage={searchedMessage}
          />
        )}
      </div>
    </div>
  );
}

export default ChatPage;

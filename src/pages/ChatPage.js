import React, { useState, useContext, useEffect } from "react";
import "../styles/chatpage.css";
import { useNavigate, useParams } from "react-router-dom";
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

  const navigate = useNavigate();

  // Get email id from url
  const { emailId } = useParams();

  // Send Message
  const sendMessage = (e) => {
    e.preventDefault();
    if (block.length === 0 && message.length !== 0 && emailId) {
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailId,
        timestamp: firebase.firestore.Timestamp.now(),
        read: false,
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
            return false;
          })
        );

        setChatMessages(newMessage);
      });
  };

  useEffect(() => {
    // Marked messages as true when chatpage loads
    const markAsRead = () => {
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.update({
              read: true,
            });
          });
        });
    };

    setInterval(() => {
      markAsRead();
    }, 1000);
  }, [currentUser.email]);

  // Chat Popover
  const handleChatPopover = () => {
    setChatPopover(!chatPopover);
  };

  // Close chat popover if clicked outside
  const handleClickAway = () => {
    setChatPopover(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        toggleSidebarContext.toggleSidebarDispatch("show");
        toggleSidebarProfileContext.toggleSidebarProfileDispatch("hide");
        toggleSettingsContext.toggleSettingsDispatch("hide");
        settingsNotificationContext.settingsNotificationDispatch("hide");
        settingsPrivacyContext.settingsPrivacyDispatch("hide");
        settingsSecurityContext.settingsSecurityDispatch("hide");
        settingsAccountInfoContext.settingsAccountInfoDispatch("hide");
        settingsHelpContext.settingsHelpDispatch("hide");
        searchMessageContext.searchMessageDispatch("hide");
        toggleContactInfoContext.toggleContactInfoDispatch("hide");

        // Navigate to home
        if (
          toggleContactInfoContext.toggleContactInfoState === false &&
          toggleSidebarProfileContext.toggleSidebarProfileState === false &&
          toggleSettingsContext.toggleSettingsState === false &&
          settingsAccountInfoContext.settingsAccountInfoState === false &&
          settingsHelpContext.settingsHelpState === false &&
          settingsNotificationContext.settingsNotificationState === false &&
          settingsPrivacyContext.settingsPrivacyState === false &&
          settingsPrivacyContext.settingsPrivacyState === false
        ) {
          navigate("/");
        }
      }
    });
    // eslint-disable-next-line
  }, []);

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

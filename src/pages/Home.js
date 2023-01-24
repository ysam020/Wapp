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
import Chat from "../components/Chat";
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
  ThemeContext,
  ToggleContactInfoContext,
  SearchMessageContext,
  EncryptionContext,
  DisappearingMessagesContext,
  StarredMessageContext,
} from "../contexts/Context";
import db from "../firebase";
import firebase from "firebase/app";
import LockIcon from "@mui/icons-material/Lock";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import cryptoRandomString from "crypto-random-string";

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
  const themeContext = useContext(ThemeContext);
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

  useEffect(() => {
    // Update last online in user collection
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

        sendMessageToDatabase(payload);
      }

      setMessage("");
    },
    // eslint-disable-next-line
    [message]
  );

  const sendMessageToDatabase = (payload) => {
    //Add message to chat collection for sender
    senderMessageCollectionRef.add(payload);

    //Add message to chat collection for receiver
    receiverMessageCollectionRef.add(payload);

    // Add friend in FriendList collection for sender
    senderFriendListRef.set({
      email: chatUser.email,
      fullname: chatUser.fullname,
      photoURL: chatUser.photoURL,
      lastMessage: message,
      messageType: payload.messageInfo,
      messageSent: true,
      messageRead: false,
      timestamp: firebase.firestore.Timestamp.now(),
    });

    // Add friend in FriendList collection for receiver
    receiverFriendListRef.set({
      email: currentUser.email,
      fullname: currentUser.fullname,
      photoURL: currentUser.photoURL,
      lastMessage: message,
      messageType: payload.messageInfo,
      timestamp: firebase.firestore.Timestamp.now(),
    });

    // Mark messages as read when user replies
    senderMessageCollectionRef
      .doc(emailId)
      .collection("messages")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            read: true,
          });
        });
      });

    receiverFriendListRef.update({ messageRead: true });
  };

  // Get chats from database
  const getMessages = () => {
    senderMessageCollectionRef
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());

        let newMessage = messages.filter(
          (message) =>
            message.senderEmail === (currentUser.email && emailId) ||
            message.receiverEmail === (currentUser.email && emailId)
        );

        // Get starred messages
        senderMessageCollectionRef
          .where("starred", "==", true)
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            setStarredMessages(snapshot.docs);
          });

        setChatMessages(newMessage);
      });
  };

  // Delete chat
  const deleteChat = () => {
    senderMessageCollectionRef
      .where("receiverEmail", "==", emailId, "||", currentUser.email)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          senderMessageCollectionRef.doc(doc.id).delete()
        )
      );

    senderMessageCollectionRef
      .where("senderEmail", "==", emailId, "||", currentUser.email)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          senderMessageCollectionRef.doc(doc.id).delete()
        )
      );

    receiverMessageCollectionRef
      .where("receiverEmail", "==", emailId, "||", currentUser.email)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          receiverMessageCollectionRef.doc(doc.id).delete()
        )
      );

    receiverMessageCollectionRef
      .where("senderEmail", "==", emailId, "||", currentUser.email)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          receiverMessageCollectionRef.doc(doc.id).delete()
        )
      );

    // Delete from friend list
    senderFriendListRef.delete();

    receiverFriendListRef.delete();

    setChat(false);

    localStorage.removeItem("chat");
  };

  // Delete selected messages
  const deleteSelectedMessages = useCallback(() => {
    selectedMessages.map((message) => {
      senderMessageCollectionRef
        .where("messageId", "==", message)
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) =>
            senderMessageCollectionRef
              .doc(doc.id)
              .delete()
              .then(() => {
                // Update last message in sidebar
                senderMessageCollectionRef
                  .where(
                    "senderEmail",
                    "==",
                    currentUser.email,
                    "&&",
                    emailId,
                    "||",
                    "receiverEmail",
                    "==",
                    currentUser.email,
                    "&&",
                    emailId
                  )
                  .orderBy("timestamp", "desc")
                  .limit(1)
                  .onSnapshot((snapshot) => {
                    senderFriendListRef.update({
                      lastMessage: snapshot.docs[0].data().text,
                      messageRead: snapshot.docs[0].data().read,
                      messageType: snapshot.docs[0].data().messageInfo,
                      timestamp: snapshot.docs[0].data().timestamp,
                    });
                  });
              })
          )
        );

      receiverMessageCollectionRef
        .where("messageId", "==", message)
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) =>
            receiverMessageCollectionRef.doc(doc.id).delete()
          )
        );

      setSelectMessagesUI(false);
      setSelectedMessages([]);
      return "";
    });

    // eslint-disable-next-line
  }, [selectMessagesUI, selectedMessages]);

  const starMessages = () => {
    selectedMessages.map((message) => {
      senderMessageCollectionRef
        .where("messageId", "==", message)
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) =>
            senderMessageCollectionRef.doc(doc.id).update({ starred: true })
          )
        );

      return "";
    });
  };

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
                getMessages={getMessages}
                sendMessageToDatabase={sendMessageToDatabase}
                deleteChat={deleteChat}
                selectedMessages={selectedMessages}
                setSelectedMessages={setSelectedMessages}
                deleteSelectedMessages={deleteSelectedMessages}
                starMessages={starMessages}
                emailId={emailId}
                setChat={setChat}
                selectMessagesUI={selectMessagesUI}
                setSelectMessagesUI={setSelectMessagesUI}
              />

              {toggleContactInfoContext.toggleContactInfoState && (
                <ContactInfo
                  deleteChat={deleteChat}
                  emailId={emailId}
                  block={block}
                  setBlock={setBlock}
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
              {themeContext.theme === "dark" ? (
                <span
                  data-testid="intro-md-beta-logo-dark"
                  data-icon="intro-md-beta-logo-dark"
                  className="IVxyB"
                >
                  <svg
                    viewBox="0 0 303 172"
                    width="360"
                    preserveAspectRatio="xMidYMid meet"
                    className=""
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M229.565 160.229C262.212 149.245 286.931 118.241 283.39 73.4194C278.009 5.31929 212.365 -11.5738 171.472 8.48673C115.998 35.6999 108.972 40.1612 69.2388 40.1612C39.645 40.1612 9.51317 54.4147 5.74669 92.952C3.01662 120.885 13.9985 145.267 54.6373 157.716C128.599 180.373 198.017 170.844 229.565 160.229Z"
                      fill="#364147"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M131.589 68.9422C131.593 68.9422 131.596 68.9422 131.599 68.9422C137.86 68.9422 142.935 63.6787 142.935 57.1859C142.935 50.6931 137.86 45.4297 131.599 45.4297C126.518 45.4297 122.218 48.8958 120.777 53.6723C120.022 53.4096 119.213 53.2672 118.373 53.2672C114.199 53.2672 110.815 56.7762 110.815 61.1047C110.815 65.4332 114.199 68.9422 118.373 68.9422C118.377 68.9422 118.381 68.9422 118.386 68.9422H131.589Z"
                      fill="#F1F1F2"
                      fillOpacity="0.38"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M105.682 128.716C109.186 128.716 112.026 125.908 112.026 122.446C112.026 118.983 109.186 116.176 105.682 116.176C104.526 116.176 103.442 116.481 102.509 117.015L102.509 116.959C102.509 110.467 97.1831 105.203 90.6129 105.203C85.3224 105.203 80.8385 108.616 79.2925 113.335C78.6052 113.143 77.88 113.041 77.1304 113.041C72.7503 113.041 69.1995 116.55 69.1995 120.878C69.1995 125.207 72.7503 128.716 77.1304 128.716C77.1341 128.716 77.1379 128.716 77.1416 128.716H105.682L105.682 128.716Z"
                      fill="#F1F1F2"
                      fillOpacity="0.38"
                    ></path>
                    <rect
                      x="0.445307"
                      y="0.549558"
                      width="50.5797"
                      height="100.068"
                      rx="7.5"
                      transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.5547 41.6171)"
                      fill="#42CBA5"
                      stroke="#316474"
                    ></rect>
                    <rect
                      x="0.445307"
                      y="0.549558"
                      width="50.4027"
                      height="99.7216"
                      rx="7.5"
                      transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.9258 37.9564)"
                      fill="#EEFAF6"
                      stroke="#316474"
                    ></rect>
                    <path
                      d="M57.1609 51.7354L48.5917 133.759C48.2761 136.78 45.5713 138.972 42.5503 138.654L9.58089 135.189C6.55997 134.871 4.36688 132.165 4.68251 129.144L13.2517 47.1204C13.5674 44.0992 16.2722 41.9075 19.2931 42.2251L24.5519 42.7778L47.0037 45.1376L52.2625 45.6903C55.2835 46.0078 57.4765 48.7143 57.1609 51.7354Z"
                      fill="#DFF3ED"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M26.2009 102.937C27.0633 103.019 27.9323 103.119 28.8023 103.21C29.0402 101.032 29.2706 98.8437 29.4916 96.6638L26.8817 96.39C26.6438 98.5681 26.4049 100.755 26.2009 102.937ZM23.4704 93.3294L25.7392 91.4955L27.5774 93.7603L28.7118 92.8434L26.8736 90.5775L29.1434 88.7438L28.2248 87.6114L25.955 89.4452L24.1179 87.1806L22.9824 88.0974L24.8207 90.3621L22.5508 92.197L23.4704 93.3294ZM22.6545 98.6148C22.5261 99.9153 22.3893 101.215 22.244 102.514C23.1206 102.623 23.9924 102.697 24.8699 102.798C25.0164 101.488 25.1451 100.184 25.2831 98.8734C24.4047 98.7813 23.5298 98.6551 22.6545 98.6148ZM39.502 89.7779C38.9965 94.579 38.4833 99.3707 37.9862 104.174C38.8656 104.257 39.7337 104.366 40.614 104.441C41.1101 99.6473 41.6138 94.8633 42.1271 90.0705C41.2625 89.9282 40.3796 89.8786 39.502 89.7779ZM35.2378 92.4459C34.8492 96.2179 34.4351 99.9873 34.0551 103.76C34.925 103.851 35.7959 103.934 36.6564 104.033C37.1028 100.121 37.482 96.1922 37.9113 92.2783C37.0562 92.1284 36.18 92.0966 35.3221 91.9722C35.2812 92.1276 35.253 92.286 35.2378 92.4459ZM31.1061 94.1821C31.0635 94.341 31.0456 94.511 31.0286 94.6726C30.7324 97.5678 30.4115 100.452 30.1238 103.348L32.7336 103.622C32.8582 102.602 32.9479 101.587 33.0639 100.567C33.2611 98.5305 33.5188 96.4921 33.6905 94.4522C32.8281 94.3712 31.9666 94.2811 31.1061 94.1821Z"
                      fill="#316474"
                    ></path>
                    <path
                      d="M17.892 48.4889C17.7988 49.3842 18.4576 50.1945 19.3597 50.2923C20.2665 50.3906 21.0855 49.7332 21.1792 48.8333C21.2724 47.938 20.6136 47.1277 19.7115 47.0299C18.8047 46.9316 17.9857 47.5889 17.892 48.4889Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M231.807 136.678L197.944 139.04C197.65 139.06 197.404 139.02 197.249 138.96C197.208 138.945 197.179 138.93 197.16 138.918L196.456 128.876C196.474 128.862 196.5 128.843 196.538 128.822C196.683 128.741 196.921 128.668 197.215 128.647L231.078 126.285C231.372 126.265 231.618 126.305 231.773 126.365C231.814 126.381 231.842 126.395 231.861 126.407L232.566 136.449C232.548 136.463 232.522 136.482 232.484 136.503C232.339 136.584 232.101 136.658 231.807 136.678Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M283.734 125.679L144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2005 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679Z"
                      fill="#EEFAF6"
                    ></path>
                    <path
                      d="M144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2004 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M278.565 121.405L148.68 130.463C146.256 130.632 144.174 128.861 144.012 126.55L138.343 45.695C138.181 43.3846 139.994 41.3414 142.419 41.1723L272.304 32.1142C274.731 31.945 276.81 33.7166 276.972 36.0271L282.641 116.882C282.803 119.193 280.992 121.236 278.565 121.405Z"
                      fill="#DFF3ED"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M230.198 129.97L298.691 125.193L299.111 131.189C299.166 131.97 299.013 132.667 298.748 133.161C298.478 133.661 298.137 133.887 297.825 133.909L132.794 145.418C132.482 145.44 132.113 145.263 131.777 144.805C131.445 144.353 131.196 143.684 131.141 142.903L130.721 136.907L199.215 132.131C199.476 132.921 199.867 133.614 200.357 134.129C200.929 134.729 201.665 135.115 202.482 135.058L227.371 133.322C228.188 133.265 228.862 132.782 229.345 132.108C229.758 131.531 230.05 130.79 230.198 129.97Z"
                      fill="#42CBA5"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M230.367 129.051L300.275 124.175L300.533 127.851C300.591 128.681 299.964 129.403 299.13 129.461L130.858 141.196C130.025 141.254 129.303 140.627 129.245 139.797L128.987 136.121L198.896 131.245C199.485 132.391 200.709 133.147 202.084 133.051L227.462 131.281C228.836 131.185 229.943 130.268 230.367 129.051Z"
                      fill="#EEFAF6"
                      stroke="#316474"
                    ></path>
                    <ellipse
                      rx="15.9969"
                      ry="15.9971"
                      transform="matrix(0.997577 -0.0695704 0.0699429 0.997551 210.659 83.553)"
                      fill="#42CBA5"
                      stroke="#316474"
                    ></ellipse>
                    <path
                      d="M208.184 87.1094L204.777 84.3593C204.777 84.359 204.776 84.3587 204.776 84.3583C203.957 83.6906 202.744 83.8012 202.061 84.6073C201.374 85.4191 201.486 86.6265 202.31 87.2997L202.312 87.3011L207.389 91.4116C207.389 91.4119 207.389 91.4121 207.389 91.4124C208.278 92.1372 209.611 91.9373 210.242 90.9795L218.283 78.77C218.868 77.8813 218.608 76.6968 217.71 76.127C216.817 75.5606 215.624 75.8109 215.043 76.6939L208.184 87.1094Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                  </svg>
                </span>
              ) : (
                <span
                  data-testid="intro-md-beta-logo-light"
                  data-icon="intro-md-beta-logo-light"
                  className="IVxyB"
                >
                  <svg
                    viewBox="0 0 303 172"
                    width="360"
                    preserveAspectRatio="xMidYMid meet"
                    className=""
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M229.565 160.229C262.212 149.245 286.931 118.241 283.39 73.4194C278.009 5.31929 212.365 -11.5738 171.472 8.48673C115.998 35.6999 108.972 40.1612 69.2388 40.1612C39.645 40.1612 9.51318 54.4147 5.7467 92.952C3.0166 120.885 13.9985 145.267 54.6373 157.716C128.599 180.373 198.017 170.844 229.565 160.229Z"
                      fill="#DAF7F3"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M131.589 68.9422C131.593 68.9422 131.596 68.9422 131.599 68.9422C137.86 68.9422 142.935 63.6787 142.935 57.1859C142.935 50.6931 137.86 45.4297 131.599 45.4297C126.518 45.4297 122.218 48.8958 120.777 53.6723C120.022 53.4096 119.213 53.2672 118.373 53.2672C114.199 53.2672 110.815 56.7762 110.815 61.1047C110.815 65.4332 114.199 68.9422 118.373 68.9422C118.377 68.9422 118.381 68.9422 118.386 68.9422H131.589Z"
                      fill="white"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M105.682 128.716C109.186 128.716 112.026 125.908 112.026 122.446C112.026 118.983 109.186 116.176 105.682 116.176C104.526 116.176 103.442 116.481 102.509 117.015L102.509 116.959C102.509 110.467 97.1831 105.203 90.6129 105.203C85.3224 105.203 80.8385 108.616 79.2925 113.335C78.6052 113.143 77.88 113.041 77.1304 113.041C72.7503 113.041 69.1995 116.55 69.1995 120.878C69.1995 125.207 72.7503 128.716 77.1304 128.716C77.1341 128.716 77.1379 128.716 77.1416 128.716H105.682L105.682 128.716Z"
                      fill="white"
                    ></path>
                    <rect
                      x="0.445307"
                      y="0.549558"
                      width="50.5797"
                      height="100.068"
                      rx="7.5"
                      transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.5547 41.6171)"
                      fill="#42CBA5"
                      stroke="#316474"
                    ></rect>
                    <rect
                      x="0.445307"
                      y="0.549558"
                      width="50.4027"
                      height="99.7216"
                      rx="7.5"
                      transform="matrix(0.994522 0.104528 -0.103907 0.994587 10.9258 37.9564)"
                      fill="white"
                      stroke="#316474"
                    ></rect>
                    <path
                      d="M57.1609 51.7354L48.5917 133.759C48.2761 136.78 45.5713 138.972 42.5503 138.654L9.58089 135.189C6.55997 134.871 4.36688 132.165 4.68251 129.144L13.2517 47.1204C13.5674 44.0992 16.2722 41.9075 19.2931 42.2251L24.5519 42.7778L47.0037 45.1376L52.2625 45.6903C55.2835 46.0078 57.4765 48.7143 57.1609 51.7354Z"
                      fill="#EEFEFA"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M26.2009 102.937C27.0633 103.019 27.9323 103.119 28.8023 103.21C29.0402 101.032 29.2706 98.8437 29.4916 96.6638L26.8817 96.39C26.6438 98.5681 26.4049 100.755 26.2009 102.937ZM23.4704 93.3294L25.7392 91.4955L27.5774 93.7603L28.7118 92.8434L26.8736 90.5775L29.1434 88.7438L28.2248 87.6114L25.955 89.4452L24.1179 87.1806L22.9824 88.0974L24.8207 90.3621L22.5508 92.197L23.4704 93.3294ZM22.6545 98.6148C22.5261 99.9153 22.3893 101.215 22.244 102.514C23.1206 102.623 23.9924 102.697 24.8699 102.798C25.0164 101.488 25.1451 100.184 25.2831 98.8734C24.4047 98.7813 23.5298 98.6551 22.6545 98.6148ZM39.502 89.7779C38.9965 94.579 38.4833 99.3707 37.9862 104.174C38.8656 104.257 39.7337 104.366 40.614 104.441C41.1101 99.6473 41.6138 94.8633 42.1271 90.0705C41.2625 89.9282 40.3796 89.8786 39.502 89.7779ZM35.2378 92.4459C34.8492 96.2179 34.4351 99.9873 34.0551 103.76C34.925 103.851 35.7959 103.934 36.6564 104.033C37.1028 100.121 37.482 96.1922 37.9113 92.2783C37.0562 92.1284 36.18 92.0966 35.3221 91.9722C35.2812 92.1276 35.253 92.286 35.2378 92.4459ZM31.1061 94.1821C31.0635 94.341 31.0456 94.511 31.0286 94.6726C30.7324 97.5678 30.4115 100.452 30.1238 103.348L32.7336 103.622C32.8582 102.602 32.9479 101.587 33.0639 100.567C33.2611 98.5305 33.5188 96.4921 33.6905 94.4522C32.8281 94.3712 31.9666 94.2811 31.1061 94.1821Z"
                      fill="#316474"
                    ></path>
                    <path
                      d="M17.892 48.4889C17.7988 49.3842 18.4576 50.1945 19.3597 50.2923C20.2665 50.3906 21.0855 49.7332 21.1792 48.8333C21.2724 47.938 20.6136 47.1277 19.7115 47.0299C18.8047 46.9316 17.9857 47.5889 17.892 48.4889Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M231.807 136.678L197.944 139.04C197.65 139.06 197.404 139.02 197.249 138.96C197.208 138.945 197.179 138.93 197.16 138.918L196.456 128.876C196.474 128.862 196.5 128.843 196.538 128.822C196.683 128.741 196.921 128.668 197.215 128.647L231.078 126.285C231.372 126.265 231.618 126.305 231.773 126.365C231.814 126.381 231.842 126.395 231.861 126.407L232.566 136.449C232.548 136.463 232.522 136.482 232.484 136.503C232.339 136.584 232.101 136.658 231.807 136.678Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M283.734 125.679L144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2005 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679Z"
                      fill="white"
                    ></path>
                    <path
                      d="M144.864 135.363C141.994 135.563 139.493 133.4 139.293 130.54L133.059 41.6349C132.858 38.7751 135.031 36.2858 137.903 36.0856L276.773 26.4008C279.647 26.2004 282.144 28.364 282.345 31.2238L288.578 120.129C288.779 122.989 286.607 125.478 283.734 125.679"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M278.565 121.405L148.68 130.463C146.256 130.632 144.174 128.861 144.012 126.55L138.343 45.695C138.181 43.3846 139.994 41.3414 142.419 41.1723L272.304 32.1142C274.731 31.945 276.81 33.7166 276.972 36.0271L282.641 116.882C282.803 119.193 280.992 121.236 278.565 121.405Z"
                      fill="#EEFEFA"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M230.198 129.97L298.691 125.193L299.111 131.189C299.166 131.97 299.013 132.667 298.748 133.161C298.478 133.661 298.137 133.887 297.825 133.909L132.794 145.418C132.482 145.44 132.113 145.263 131.777 144.805C131.445 144.353 131.196 143.684 131.141 142.903L130.721 136.907L199.215 132.131C199.476 132.921 199.867 133.614 200.357 134.129C200.929 134.729 201.665 135.115 202.482 135.058L227.371 133.322C228.188 133.265 228.862 132.782 229.345 132.108C229.758 131.531 230.05 130.79 230.198 129.97Z"
                      fill="#42CBA5"
                      stroke="#316474"
                    ></path>
                    <path
                      d="M230.367 129.051L300.275 124.175L300.533 127.851C300.591 128.681 299.964 129.403 299.13 129.461L130.858 141.196C130.025 141.254 129.303 140.627 129.245 139.797L128.987 136.121L198.896 131.245C199.485 132.391 200.709 133.147 202.084 133.051L227.462 131.281C228.836 131.185 229.943 130.268 230.367 129.051Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                    <ellipse
                      rx="15.9969"
                      ry="15.9971"
                      transform="matrix(0.997577 -0.0695704 0.0699429 0.997551 210.659 83.553)"
                      fill="#42CBA5"
                      stroke="#316474"
                    ></ellipse>
                    <path
                      d="M208.184 87.1094L204.777 84.3593C204.777 84.359 204.776 84.3587 204.776 84.3583C203.957 83.6906 202.744 83.8012 202.061 84.6073C201.374 85.4191 201.486 86.6265 202.31 87.2997L202.312 87.3011L207.389 91.4116C207.389 91.4119 207.389 91.4121 207.389 91.4124C208.278 92.1372 209.611 91.9373 210.242 90.9795L218.283 78.77C218.868 77.8813 218.608 76.6968 217.71 76.127C216.817 75.5606 215.624 75.8109 215.043 76.6939L208.184 87.1094Z"
                      fill="white"
                      stroke="#316474"
                    ></path>
                  </svg>
                </span>
              )}

              <h1>Wapp web</h1>
              <p>
                Send and receive messages without keeping your phone online.
              </p>
              <p>
                Use Wapp on up to 4 linked devices and 1 phone at the same time.
              </p>
            </div>

            <div className="home-footer">
              <LockIcon className={classes.lockIcon} />
              <p>End-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Home);

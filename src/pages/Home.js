import * as React from "react";
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
import * as Context from "../contexts/Context";
import db from "../firebase";
import firebase from "firebase/app";
import * as Icons from "../components/Icons";
import { sendMessageToDatabase } from "../utils/sendMessageToDatabase";
import WappSVG from "../components/WappSVG";

function Home() {
  // Contexts
  const currentUser = React.useContext(Context.UserContext);
  const toggleSidebarProfileContext = React.useContext(
    Context.ToggleSidebarProfileContext
  );
  const toggleSettingsContext = React.useContext(Context.ToggleSettingsContext);
  const toggleSidebarContext = React.useContext(Context.ToggleSidebarContext);
  const settingsNotificationContext = React.useContext(
    Context.SettingsNotificationContext
  );
  const settingsPrivacyContext = React.useContext(
    Context.SettingsPrivacyContext
  );
  const settingsSecurityContext = React.useContext(
    Context.SettingsSecurityContext
  );
  const settingsAccountInfoContext = React.useContext(
    Context.SettingsAccountInfoContext
  );
  const settingsHelpContext = React.useContext(Context.SettingsHelpContext);
  const toggleChatWallpaperContext = React.useContext(
    Context.ToggleChatWallpaperContext
  );
  const newChatContext = React.useContext(Context.NewChatContext);
  const communitiesContext = React.useContext(Context.CommunitiesContext);
  const toggleContactInfoContext = React.useContext(
    Context.ToggleContactInfoContext
  );
  const searchMessageContext = React.useContext(Context.SearchMessageContext);
  const encryptionContext = React.useContext(Context.EncryptionContext);
  const disappearingMessagesContext = React.useContext(
    Context.DisappearingMessagesContext
  );
  const starredMessageContext = React.useContext(Context.StarredMessageContext);

  // React.useState
  const [emailId, setEmailId] = React.useState(
    JSON.parse(localStorage.getItem("chat"))
  );
  const [chat, setChat] = React.useState(emailId ? true : false);
  const [block, setBlock] = React.useState([]);
  const [starredMessages, setStarredMessages] = React.useState([]);

  // Update last online in user collection
  React.useEffect(() => {
    db.collection("users")
      .doc(currentUser.email)
      .update({ lastOnline: firebase.firestore.Timestamp.now() });
  }, [currentUser.email]);

  return (
    <Context.EmailContext.Provider value={emailId}>
      <div className="home">
        <div className="home-container">
          {toggleSidebarContext.toggleSidebarState && (
            <Sidebar setChat={setChat} setEmailId={setEmailId} />
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
          {settingsAccountInfoContext.settingsAccountInfoState && (
            <AccountInfo />
          )}
          {settingsHelpContext.settingsHelpState && <Help />}
          {toggleChatWallpaperContext.toggleChatWallpaperState && (
            <ChatWallpaper />
          )}

          {chat && emailId !== "" ? (
            <div className="chatpage">
              <div className="chatpage-container">
                <Chat
                  block={block}
                  setBlock={setBlock}
                  setStarredMessages={setStarredMessages}
                  sendMessageToDatabase={sendMessageToDatabase}
                  setChat={setChat}
                />

                {toggleContactInfoContext.toggleContactInfoState && (
                  <ContactInfo
                    block={block}
                    setBlock={setBlock}
                    setChat={setChat}
                  />
                )}
                {encryptionContext.encryptionState && <Encryption />}
                {disappearingMessagesContext.disappearingMessagesState && (
                  <DisappearingMessages />
                )}
                {searchMessageContext.searchMessageState && <SearchMessage />}
                {starredMessageContext.starredMessageState && (
                  <StarredMessages
                    starredMessages={starredMessages}
                    setStarredMessages={setStarredMessages}
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
                  Use Wapp on up to 4 linked devices and 1 phone at the same
                  time.
                </p>
              </div>

              <div className="home-footer">
                <Icons.LockIcon
                  sx={{
                    color: "#8696a0",
                    width: "18px !important",
                    height: "18px !important",
                  }}
                />
                <p>End-to-end encrypted</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Context.EmailContext.Provider>
  );
}

export default React.memo(Home);

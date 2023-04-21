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
import * as Icons from "../components/Icons";
import { sendMessageToDatabase } from "../utils/sendMessageToDatabase";
import WappSVG from "../components/WappSVG";
import useContexts from "../customHooks/contexts";
import useFriendData from "../customHooks/friendData";

function Home() {
  // Contexts
  const {
    currentUser,
    toggleSidebarState,
    toggleSidebarProfileState,
    toggleSettingsState,
    settingsNotificationState,
    settingsPrivacyState,
    settingsSecurityState,
    settingsAccountInfoState,
    settingsHelpState,
    newChatState,
    communitiesState,
    toggleContactInfoState,
    searchMessageState,
    encryptionState,
    disappearingMessagesState,
    starredMessageState,
    toggleChatWallpaperState,
  } = useContexts();

  const {
    emailId,
    setEmailId,
    chat,
    setChat,
    block,
    setBlock,
    starredMessages,
    setStarredMessages,
  } = useFriendData();

  return (
    <Context.EmailContext.Provider value={emailId}>
      <div className="home">
        <div className="home-container">
          {toggleSidebarState && (
            <Sidebar setChat={setChat} setEmailId={setEmailId} />
          )}

          {toggleSidebarProfileState && <SidebarProfile />}
          {communitiesState && <Communities />}
          {newChatState && (
            <NewChat setChat={setChat} setEmailId={setEmailId} />
          )}

          {toggleSettingsState && <Settings />}

          {settingsNotificationState && <Notifications />}
          {settingsPrivacyState && <Privacy />}
          {settingsSecurityState && <Security />}
          {settingsAccountInfoState && <AccountInfo />}
          {settingsHelpState && <Help />}
          {toggleChatWallpaperState && <ChatWallpaper />}

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

                {toggleContactInfoState && (
                  <ContactInfo
                    block={block}
                    setBlock={setBlock}
                    setChat={setChat}
                  />
                )}
                {encryptionState && <Encryption />}
                {disappearingMessagesState && <DisappearingMessages />}
                {searchMessageState && <SearchMessage />}
                {starredMessageState && (
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

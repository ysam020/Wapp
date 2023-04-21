import * as React from "react";
import * as Context from "../contexts/Context";

function useContexts() {
  // Auth
  const { signIn, logout } = React.useContext(Context.AuthContext);

  //   User
  const currentUser = React.useContext(Context.UserContext);

  //   Sidebar
  const { toggleSidebarState, toggleSidebarDispatch } = React.useContext(
    Context.ToggleSidebarContext
  );

  //   Sidebar profile
  const { toggleSidebarProfileState, toggleSidebarProfileDispatch } =
    React.useContext(Context.ToggleSidebarProfileContext);

  //   Contact info
  const { toggleContactInfoState, toggleContactInfoDispatch } =
    React.useContext(Context.ToggleContactInfoContext);

  //   Chat wallpaper
  const { toggleChatWallpaperState, toggleChatWallpaperDispatch } =
    React.useContext(Context.ToggleChatWallpaperContext);

  // Settings
  const { toggleSettingsState, toggleSettingsDispatch } = React.useContext(
    Context.ToggleSettingsContext
  );

  //   Settings notification
  const { settingsNotificationState, settingsNotificationDispatch } =
    React.useContext(Context.SettingsNotificationContext);

  //   Settings privacy
  const { settingsPrivacyState, settingsPrivacyDispatch } = React.useContext(
    Context.SettingsPrivacyContext
  );

  //   Settings security
  const { settingsSecurityState, settingsSecurityDispatch } = React.useContext(
    Context.SettingsSecurityContext
  );

  //   Settings account info
  const { settingsAccountInfoState, settingsAccountInfoDispatch } =
    React.useContext(Context.SettingsAccountInfoContext);

  //   Settings help
  const { settingsHelpState, settingsHelpDispatch } = React.useContext(
    Context.SettingsHelpContext
  );

  //   Theme
  const { theme, toggleTheme } = React.useContext(Context.ThemeContext);

  //   Search messages
  const { searchMessageState, searchMessageDispatch } = React.useContext(
    Context.SearchMessageContext
  );

  //   Chat background
  const { chatBackground, setChatBackground, doodle, setDoodle } =
    React.useContext(Context.ChatBackgroundContext);

  //   New chat
  const { newChatState, newChatDispatch } = React.useContext(
    Context.NewChatContext
  );

  //   Communities
  const { communitiesState, communitiesDispatch } = React.useContext(
    Context.CommunitiesContext
  );

  //   Encryption
  const { encryptionState, encryptionDispatch } = React.useContext(
    Context.EncryptionContext
  );

  //   Disappearing messages
  const { disappearingMessagesState, disappearingMessagesDispatch } =
    React.useContext(Context.DisappearingMessagesContext);

  //   Starred messages
  const { starredMessageState, starredMessageDispatch } = React.useContext(
    Context.StarredMessageContext
  );

  //   Emailid
  const emailId = React.useContext(Context.EmailContext);

  //   Chat details
  const chatDetailsContext = React.useContext(Context.ChatDetailsContext);

  return {
    signIn,
    logout,
    currentUser,
    // Sidebar
    toggleSidebarState,
    toggleSidebarDispatch,

    // Sidebar profile
    toggleSidebarProfileState,
    toggleSidebarProfileDispatch,

    // Contact info
    toggleContactInfoState,
    toggleContactInfoDispatch,

    // Chat wallpaper
    toggleChatWallpaperState,
    toggleChatWallpaperDispatch,

    // Settings
    toggleSettingsState,
    toggleSettingsDispatch,

    // Settings notification
    settingsNotificationState,
    settingsNotificationDispatch,

    // Settings privacy
    settingsPrivacyState,
    settingsPrivacyDispatch,

    // Settings security
    settingsSecurityState,
    settingsSecurityDispatch,

    // Settings account info
    settingsAccountInfoState,
    settingsAccountInfoDispatch,

    // Settings help
    settingsHelpState,
    settingsHelpDispatch,

    // Theme
    theme,
    toggleTheme,

    // Search messages
    searchMessageState,
    searchMessageDispatch,

    // Chat background
    chatBackground,
    setChatBackground,
    doodle,
    setDoodle,

    // New chat
    newChatState,
    newChatDispatch,

    // Communities
    communitiesState,
    communitiesDispatch,

    // Encryption
    encryptionState,
    encryptionDispatch,

    // Disappearing messages
    disappearingMessagesState,
    disappearingMessagesDispatch,

    // Starred messages
    starredMessageState,
    starredMessageDispatch,

    // Emailid
    emailId,

    // Chat details
    chatDetailsContext,
  };
}

export default useContexts;

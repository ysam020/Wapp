import * as React from "react";
// Contexts
import * as Context from "../contexts/Context";

///////////////////////////////////////////////////////////////////
function useContexts() {
  // Auth
  const { signIn, logout } = React.useContext(Context.AuthContext);

  //   User
  const currentUser = React.useContext(Context.UserContext);

  //   Theme
  const { theme, toggleTheme } = React.useContext(Context.ThemeContext);

  //   Chat background
  const { chatBackground, setChatBackground, doodle, setDoodle } =
    React.useContext(Context.ChatBackgroundContext);

  //   Emailid
  const emailId = React.useContext(Context.EmailContext);

  //   Chat details
  const chatDetailsContext = React.useContext(Context.ChatDetailsContext);

  return {
    signIn,
    logout,
    currentUser,

    // Theme
    theme,
    toggleTheme,

    // Chat background
    chatBackground,
    setChatBackground,
    doodle,
    setDoodle,

    // Emailid
    emailId,

    // Chat details
    chatDetailsContext,
  };
}

export default useContexts;

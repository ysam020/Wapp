import React, { useContext } from "react";
import "../styles/home.css";
import Sidebar from "../components/Sidebar";
import SidebarProfile from "../components/SidebarProfile.tsx";
import Settings from "../components/SettingsComponents/Settings";
import Notifications from "../components/SettingsComponents/Notifications";
import Privacy from "../components/SettingsComponents/Privacy";
import Security from "../components/SettingsComponents/Security";
import AccountInfo from "../components/SettingsComponents/AccountInfo";
import Help from "../components/SettingsComponents/Help";
import {
  ToggleSidebarProfileContext,
  ToggleSettingsContext,
  ToggleSidebarContext,
  SettingsNotificationContext,
  SettingsPrivacyContext,
  SettingsSecurityContext,
  SettingsAccountInfoContext,
  SettingsHelpContext,
} from "../contexts/Context";

function Home() {
  const toggleSidebarProfileContext = useContext(ToggleSidebarProfileContext);
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);
  const settingsNotificationContext = useContext(SettingsNotificationContext);
  const settingsPrivacyContext = useContext(SettingsPrivacyContext);
  const settingsSecurityContext = useContext(SettingsSecurityContext);
  const settingsAccountInfoContext = useContext(SettingsAccountInfoContext);
  const settingsHelpContext = useContext(SettingsHelpContext);

  return (
    <div className="home">
      <div className="home-container">
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

        <div className="home-bg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png"
            alt=""
            className="home-bg-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

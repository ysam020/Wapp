import React, { useContext } from "react";
import "../../styles/settings.css";
import {
  UserContext,
  ToggleSettingsContext,
  ToggleSidebarContext,
  SettingsNotificationContext,
  SettingsPrivacyContext,
  SettingsSecurityContext,
  SettingsAccountInfoContext,
  SettingsHelpContext,
  ThemeContext,
  ToggleChatWallpaperContext,
  ChatBackgroundContext,
} from "../../contexts/Context";

import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

// MUI components
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import Switch from "@mui/material/Switch";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";

// Material icons
import * as Icons from "../Icons";

const useStyles = makeStyles(() =>
  createStyles({
    backIcon: {
      color: "white",
    },
    avatarIcon: {
      height: "80px",
      width: "80px",
    },
    settingsListIcon: {
      color: "#8696A0",
    },
  })
);

// Theme Switch Styles
const ThemeSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#015C4B",
    "&:hover": {
      backgroundColor: "#015C4B, theme.palette.action.hoverOpacity)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#015C4B",
  },
}));

function Settings() {
  // MUI Styles
  const classes = useStyles();

  // UseState
  const [openModal, setOpenModal] = React.useState(false);

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);
  const settingsNotificationContext = useContext(SettingsNotificationContext);
  const settingsPrivacyContext = useContext(SettingsPrivacyContext);
  const settingsSecurityContext = useContext(SettingsSecurityContext);
  const settingsAccountInfoContext = useContext(SettingsAccountInfoContext);
  const settingsHelpContext = useContext(SettingsHelpContext);
  const themeContext = useContext(ThemeContext);
  const toggleChatWallpaperContext = useContext(ToggleChatWallpaperContext);
  const { setChatBackground } = useContext(ChatBackgroundContext);

  const settingsList = [
    {
      id: 1,
      name: "Notifications",
      icon: <Icons.NotificationsRoundedIcon />,
      style: "settings-list-item settings-list-item-notifications",
      onClick: () => {
        settingsNotificationContext.settingsNotificationDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 2,
      name: "Privacy",
      icon: <Icons.LockRoundedIcon />,
      style: "settings-list-item settings-list-item-privacy",
      onClick: () => {
        settingsPrivacyContext.settingsPrivacyDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 3,
      name: "Security",
      icon: <Icons.SecurityRoundedIcon />,
      style: "settings-list-item settings-list-item-security",
      onClick: () => {
        settingsSecurityContext.settingsSecurityDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 4,
      name: "Dark theme",
      icon: <Icons.Brightness6RoundedIcon />,
      style: "settings-list-item settings-list-item-theme",
    },
    {
      id: 5,
      name: "Chat Wallpaper",
      icon: <Icons.WallpaperRoundedIcon />,
      style: "settings-list-item settings-list-item-chat-wallpaper",
      onClick: () => {
        toggleChatWallpaperContext.toggleChatWallpaperDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 6,
      name: "Request Account Info",
      icon: <Icons.FeedRoundedIcon />,
      style: "settings-list-item settings-list-item-request-account-info",
      onClick: () => {
        settingsAccountInfoContext.settingsAccountInfoDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 7,
      name: "Keyboard Shortcuts",
      icon: <Icons.BrightnessAutoRoundedIcon />,
      style: "settings-list-item settings-list-item-keyboard-shortcuts",
      onClick: () => {
        handleOpenModal();
      },
    },
    {
      id: 8,
      name: "Help",
      icon: <Icons.HelpRoundedIcon />,
      style: "settings-list-item settings-list-item-help",
      onClick: () => {
        settingsHelpContext.settingsHelpDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
  ];

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <KeyboardShortcutsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <div className="sidebar-panel">
        <div className="sidebar-panel-header">
          <div className="sidebar-panel-header-container">
            <IconButton
              aria-label="back"
              className={classes.backIcon}
              onClick={() => {
                toggleSettingsContext.toggleSettingsDispatch("toggle");
                toggleSidebarContext.toggleSidebarDispatch("toggle");
              }}
            >
              <Icons.ArrowBackIcon />
            </IconButton>
            <h3>Settings</h3>
          </div>
        </div>

        <div className="settings-body">
          <div className="settings-user-info">
            <div className="settings-user-info-image"></div>
            <Avatar
              src={currentUser.photoURL}
              className={classes.avatarIcon}
              alt={currentUser.fullname}
            />
            <div className="settings-user-info-text">
              <h3>{currentUser.fullname}</h3>
              <p>{currentUser.about}</p>
            </div>
          </div>

          <div className="settings-list">
            {settingsList.map((values) => {
              const { id, name, icon, style, onClick } = values;

              return (
                <div key={id} className={style} onClick={onClick}>
                  <IconButton
                    aria-label="settings-list"
                    className={classes.settingsListIcon}
                  >
                    {icon}
                  </IconButton>
                  <h5>{name}</h5>

                  {/* Show theme switch button only if name = dark theme when mapping */}
                  {name === "Dark theme" && (
                    <ThemeSwitch
                      onChange={themeContext.toggleTheme}
                      onClick={() => {
                        setChatBackground(
                          themeContext.theme === "light" ? "#EFEAE2" : "#0C141A"
                        );
                        localStorage.setItem(
                          "chatBackground",
                          JSON.stringify(
                            themeContext.theme === "light"
                              ? "#0C141A"
                              : "#EFEAE2"
                          )
                        );
                      }}
                      checked={themeContext.theme === "dark"}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{
                        color: "#8696A0",
                        "&.Mui-checked": {
                          color: "#04A784",
                        },
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Settings);

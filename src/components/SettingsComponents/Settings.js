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
} from "../../contexts/Context";
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import Brightness6RoundedIcon from "@mui/icons-material/Brightness6Rounded";
import WallpaperRoundedIcon from "@mui/icons-material/WallpaperRounded";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const useStyles = makeStyles((theme) =>
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
const ThemeSwitch = styled(Switch)(({ theme }) => ({
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

  const settingsList = [
    {
      id: 1,
      name: "Notifications",
      icon: <NotificationsRoundedIcon />,
      style: "settings-list-item settings-list-item-notifications",
      onClick: () => {
        settingsNotificationContext.settingsNotificationDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 2,
      name: "Privacy",
      icon: <LockRoundedIcon />,
      style: "settings-list-item settings-list-item-privacy",
      onClick: () => {
        settingsPrivacyContext.settingsPrivacyDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 3,
      name: "Security",
      icon: <SecurityRoundedIcon />,
      style: "settings-list-item settings-list-item-security",
      onClick: () => {
        settingsSecurityContext.settingsSecurityDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 4,
      name: "Dark theme",
      icon: <Brightness6RoundedIcon />,
      style: "settings-list-item settings-list-item-theme",
      onClick: () => {},
    },
    {
      id: 5,
      name: "Chat Wallpaper",
      icon: <WallpaperRoundedIcon />,
      style: "settings-list-item settings-list-item-chat-wallpaper",
      onClick: () => {},
    },
    {
      id: 6,
      name: "Request Account Info",
      icon: <FeedRoundedIcon />,
      style: "settings-list-item settings-list-item-request-account-info",
      onClick: () => {
        settingsAccountInfoContext.settingsAccountInfoDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 7,
      name: "Keyboard Shortcuts",
      icon: <BrightnessAutoRoundedIcon />,
      style: "settings-list-item settings-list-item-keyboard-shortcuts",
      onClick: () => {},
    },
    {
      id: 8,
      name: "Help",
      icon: <HelpRoundedIcon />,
      style: "settings-list-item settings-list-item-help",
      onClick: () => {
        settingsHelpContext.settingsHelpDispatch("toggle");
        toggleSettingsContext.toggleSettingsDispatch("toggle");
      },
    },
  ];

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsContext.toggleSettingsDispatch("toggle");
              toggleSidebarContext.toggleSidebarDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Settings</h3>
        </div>
      </div>

      <div className="settings-body">
        <div className="settings-user-info">
          <div className="settings-user-info-image"></div>
          <Avatar src={currentUser.photoURL} className={classes.avatarIcon} />
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
                <IconButton className={classes.settingsListIcon}>
                  {icon}
                </IconButton>
                <h5>{name}</h5>

                {/* Show theme switch button only for dark theme */}
                {name === "Dark theme" && (
                  <ThemeSwitch
                    onChange={themeContext.toggleTheme}
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
  );
}

export default Settings;

import React from "react";
import * as Icons from "../components/Icons";
import useContexts from "./contexts";

function useSettingsList() {
  // UseState
  const [openModal, setOpenModal] = React.useState(false);

  const {
    toggleSettingsDispatch,
    settingsNotificationDispatch,
    settingsPrivacyDispatch,
    settingsSecurityDispatch,
    settingsAccountInfoDispatch,
    settingsHelpDispatch,
    toggleChatWallpaperDispatch,
  } = useContexts();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const settingsList = [
    {
      id: 1,
      name: "Notifications",
      icon: <Icons.NotificationsRoundedIcon />,
      style: "settings-list-item settings-list-item-notifications",
      onClick: () => {
        settingsNotificationDispatch("toggle");
        toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 2,
      name: "Privacy",
      icon: <Icons.LockRoundedIcon />,
      style: "settings-list-item settings-list-item-privacy",
      onClick: () => {
        settingsPrivacyDispatch("toggle");
        toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 3,
      name: "Security",
      icon: <Icons.SecurityRoundedIcon />,
      style: "settings-list-item settings-list-item-security",
      onClick: () => {
        settingsSecurityDispatch("toggle");
        toggleSettingsDispatch("toggle");
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
        toggleChatWallpaperDispatch("toggle");
        toggleSettingsDispatch("toggle");
      },
    },
    {
      id: 6,
      name: "Request Account Info",
      icon: <Icons.FeedRoundedIcon />,
      style: "settings-list-item settings-list-item-request-account-info",
      onClick: () => {
        settingsAccountInfoDispatch("toggle");
        toggleSettingsDispatch("toggle");
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
        settingsHelpDispatch("toggle");
        toggleSettingsDispatch("toggle");
      },
    },
  ];
  return {
    settingsList,
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
  };
}

export default useSettingsList;

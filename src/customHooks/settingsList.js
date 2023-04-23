import { useState } from "react";
// Components
import * as Icons from "../components/Icons";

///////////////////////////////////////////////////////////////////
function useSettingsList(toggleDrawer) {
  // useState
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const settingsList = [
    {
      id: 1,
      name: "Notifications",
      icon: <Icons.NotificationsRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-notifications",
      onClick: toggleDrawer("notifications", true),
    },
    {
      id: 2,
      name: "Privacy",
      icon: <Icons.LockRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-privacy",
      onClick: toggleDrawer("privacy", true),
    },
    {
      id: 3,
      name: "Security",
      icon: <Icons.SecurityRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-security",
      onClick: toggleDrawer("security", true),
    },
    {
      id: 4,
      name: "Dark theme",
      icon: <Icons.Brightness6RoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-theme",
    },
    {
      id: 5,
      name: "Chat Wallpaper",
      icon: <Icons.WallpaperRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-chat-wallpaper",
      onClick: toggleDrawer("chatWallpaper", true),
    },
    {
      id: 6,
      name: "Request Account Info",
      icon: <Icons.FeedRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-request-account-info",
      onClick: toggleDrawer("accountInfo", true),
    },
    {
      id: 7,
      name: "Keyboard Shortcuts",
      icon: <Icons.BrightnessAutoRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-keyboard-shortcuts",
      onClick: () => {
        handleOpenModal();
      },
    },
    {
      id: 8,
      name: "Help",
      icon: <Icons.HelpRoundedIcon color="primary" />,
      style: "settings-list-item settings-list-item-help",
      onClick: toggleDrawer("help", true),
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

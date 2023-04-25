import { useState, useEffect } from "react";
// Components
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
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

///////////////////////////////////////////////////////////////////
function useLeftSidebarPanels(drawerWidth, setChatUser, setChat) {
  // useState
  const [state, setState] = useState({
    sidebar: true,
    sidebarProfile: false,
    communities: false,
    newChat: false,
    settings: false,
    notifications: false,
    privacy: false,
    security: false,
    chatWallpaper: false,
    accountInfo: false,
    help: false,
  });

  const toggleDrawer = (drawer, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [drawer]: open });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setState((prevState) => ({
          ...prevState,
          sidebar: true,
          sidebarProfile: false,
          communities: false,
          newChat: false,
          settings: false,
          notifications: false,
          privacy: false,
          security: false,
          chatWallpaper: false,
          accountInfo: false,
          help: false,
        }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const drawerData = [
    {
      name: "sidebar",
      component: (
        <Sidebar
          toggleDrawer={toggleDrawer}
          setChat={setChat}
          setChatUser={setChatUser}
        />
      ),
    },
    {
      name: "sidebarProfile",
      component: <SidebarProfile toggleDrawer={toggleDrawer} />,
    },
    {
      name: "communities",
      component: <Communities toggleDrawer={toggleDrawer} />,
    },
    {
      name: "newChat",
      component: (
        <NewChat
          toggleDrawer={toggleDrawer}
          setChat={setChat}
          setChatUser={setChatUser}
        />
      ),
    },
    {
      name: "settings",
      component: <Settings toggleDrawer={toggleDrawer} />,
    },
    {
      name: "notifications",
      component: <Notifications toggleDrawer={toggleDrawer} />,
    },
    {
      name: "privacy",
      component: <Privacy toggleDrawer={toggleDrawer} />,
    },
    {
      name: "security",
      component: <Security toggleDrawer={toggleDrawer} />,
    },
    {
      name: "chatWallpaper",
      component: <ChatWallpaper toggleDrawer={toggleDrawer} />,
    },
    {
      name: "accountInfo",
      component: <AccountInfo toggleDrawer={toggleDrawer} />,
    },
    {
      name: "help",
      component: <Help toggleDrawer={toggleDrawer} />,
    },
  ];

  const sidebarPanels = (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {drawerData.map((drawer) => (
        <SwipeableDrawer
          key={drawer.name}
          variant={drawer.name === "sidebar" ? "permanent" : "persistent"}
          anchor="left"
          open={state[drawer.name]}
          onClose={toggleDrawer(drawer.name, false)}
          onOpen={toggleDrawer(drawer.name, true)}
          sx={{
            "& .MuiDrawer-paper": {
              borderWidth: 0,
              backgroundColor: "transparent !important",
            },
          }}
        >
          {drawer.component}
        </SwipeableDrawer>
      ))}
    </Box>
  );

  return {
    sidebarPanels,
  };
}

export default useLeftSidebarPanels;

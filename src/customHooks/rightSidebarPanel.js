import { useState } from "react";
// Components
import ContactInfo from "../components/ContactInfo";
import StarredMessages from "../components/StarredMessages";
import DisappearingMessages from "../components/DisappearingMessages";
import Encryption from "../components/Encryption";
import SearchMessage from "../components/SearchMessage";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
// Custom hooks
import useFriendData from "./friendData";

///////////////////////////////////////////////////////////////////
function useRightSidebarPanels(drawerWidth, starredMessages, block) {
  // useState
  const [state, setState] = useState({
    contactInfo: false,
    starredMessages: false,
    disappearingMessages: false,
    encryption: false,
    searchMessage: false,
  });

  // Custom hooks
  const { setChat } = useFriendData();

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

  const drawerData = [
    {
      name: "contactInfo",
      component: (
        <ContactInfo
          toggleDrawer={toggleDrawer}
          setChat={setChat}
          block={block}
        />
      ),
    },
    {
      name: "starredMessages",
      component: (
        <StarredMessages
          toggleDrawer={toggleDrawer}
          starredMessages={starredMessages}
        />
      ),
    },
    {
      name: "disappearingMessages",
      component: <DisappearingMessages toggleDrawer={toggleDrawer} />,
    },
    {
      name: "encryption",
      component: <Encryption toggleDrawer={toggleDrawer} />,
    },
    {
      name: "searchMessage",
      component: <SearchMessage toggleDrawer={toggleDrawer} />,
    },
  ];

  const rightSidebarPanels = (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {drawerData.map((drawer) => (
        <SwipeableDrawer
          key={drawer.name}
          variant="persistent"
          anchor="right"
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
    rightSidebarPanels,
    toggleDrawer,
  };
}

export default useRightSidebarPanels;

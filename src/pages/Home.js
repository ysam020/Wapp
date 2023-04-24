import * as React from "react";
// Styles
import "../styles/home.css";
// Components
import Chat from "../components/ChatComponents/Chat";
import WappSVG from "../components/WappSVG";
import * as Icons from "../components/Icons";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// Contexts
import * as Context from "../contexts/Context";
// Custom hooks
import useFriendData from "../customHooks/friendData";
import useLeftSidebarPanels from "../customHooks/leftSidebarPanels";
import useRightSidebarPanels from "../customHooks/rightSidebarPanel";

///////////////////////////////////////////////////////////////////
function Home() {
  const drawerWidth = 400;

  // Custom hooks
  const {
    emailId,
    setEmailId,
    chat,
    setChat,
    block,
    starredMessages,
    setStarredMessages,
  } = useFriendData();

  const { sidebarPanels } = useLeftSidebarPanels(
    drawerWidth,
    setEmailId,
    setChat
  );

  const { rightSidebarPanels, toggleDrawer } = useRightSidebarPanels(
    drawerWidth,
    starredMessages,
    block
  );

  return (
    <Context.EmailContext.Provider value={emailId}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          transform: "scale(.98, .96)",
          overflow: "hidden",
        }}
      >
        {/* Sidebar panels */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {sidebarPanels}
          {rightSidebarPanels}
        </Box>

        {/* Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${drawerWidth}px) !important`,
          }}
        >
          <Typography
            component="div"
            sx={{
              width: "100% !important",
              height: "100vh",
              display: "flex",
            }}
          >
            {chat ? (
              <Chat
                block={block}
                setChat={setChat}
                toggleDrawer={toggleDrawer}
                setStarredMessages={setStarredMessages}
              />
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
          </Typography>

          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {rightSidebarPanels}
          </Box>
        </Box>
      </Box>
    </Context.EmailContext.Provider>
  );
}

export default Home;

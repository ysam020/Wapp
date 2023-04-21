import React, { useState, useRef } from "react";
import "../styles/sidebar.css";
import { Avatar } from "@material-ui/core";
import SidebarChat from "./SidebarChat";
import SidebarSearchedUser from "./SidebarSearchedUser";
import * as Icons from "./Icons";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Offline } from "react-detect-offline";
import useContexts from "../customHooks/contexts";
import useGetUsers from "../customHooks/getUsers";
import useGetFriends from "../customHooks/getFriends";
import useSidebarPopover from "../customHooks/sidebarPopover";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
    rightArrowIcon: { width: "12px !important", color: "#8696A0" },
    wifiIcon: { color: "#FFD279" },
  })
);

function Sidebar(props) {
  // MUI Styles
  const classes = useStyles();

  const [searchInput, setSearchInput] = useState("");
  const [sidebarPopover, setSidebarPopover] = useState(false);
  const sidebarPopoverList = useSidebarPopover();

  // Contexts
  const {
    currentUser,
    toggleSidebarProfileDispatch,
    toggleSidebarDispatch,
    newChatDispatch,
    communitiesDispatch,
  } = useContexts();

  // Sidebar search ref
  const sidebarSearchRef = useRef();
  const { allUsers } = useGetUsers();
  const { friendList } = useGetFriends();

  // Return matching users from all users
  const searchedUser = allUsers.filter((user) => {
    if (searchInput) {
      if (
        user.data().fullname.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return user;
      }
    }
    return false;
  });

  // Map all searched users
  const searchItem = searchedUser.map((user, id) => {
    return (
      <SidebarSearchedUser
        key={id}
        name={user.data().fullname}
        email={user.data().email}
        photoURL={user.data().photoURL}
        about={user.data().about}
        setSearchInput={setSearchInput}
        setChat={props.setChat}
        setEmailId={props.setEmailId}
      />
    );
  });

  // Sidebar Popover
  const handleSidebarPopover = () => {
    setSidebarPopover(!sidebarPopover);
  };

  // Close popover on clickaway
  const handleClickAway = () => {
    setSidebarPopover(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <IconButton
          aria-label="avatar"
          onClick={() => {
            toggleSidebarProfileDispatch("toggle");
            toggleSidebarDispatch("toggle");
          }}
        >
          <Avatar src={currentUser.photoURL} alt={currentUser.fullname} />
        </IconButton>
        <div className="sidebar-header-right">
          <IconButton
            aria-label="communities"
            onClick={() => {
              toggleSidebarDispatch("toggle");
              communitiesDispatch("toggle");
            }}
          >
            <Icons.GroupsRoundedIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="status" className={classes.icon}>
            <Icons.DonutLargeSharpIcon />
          </IconButton>

          <IconButton
            aria-label="new-chat"
            className={classes.icon}
            onClick={() => {
              toggleSidebarDispatch("toggle");
              newChatDispatch("toggle");
            }}
          >
            <Icons.ChatRoundedIcon />
          </IconButton>

          <div className="sidebar-popover-container">
            <IconButton
              aria-label="more"
              onClick={handleSidebarPopover}
              className={classes.icon}
            >
              <Icons.MoreVertRoundedIcon />
              {sidebarPopover && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className="sidebar-popover">
                    {sidebarPopoverList.map((item) => {
                      return (
                        <h4 key={item.id} onClick={item.onClick}>
                          {item.name}
                        </h4>
                      );
                    })}
                  </div>
                </ClickAwayListener>
              )}
            </IconButton>
          </div>
        </div>
      </div>

      <Offline>
        <div className="sidebar-check-network">
          <div
            className="sidebar-network-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="sidebar-network-icon">
              <div className="sidebar-network-wifi-icon-container">
                <IconButton aria-label="network-icon">
                  <Icons.WifiOffIcon className={classes.wifiIcon} />
                </IconButton>
              </div>
            </div>
            <div className="sidebar-network-text">
              <h4>Computer not connected</h4>
              <p>Make sure your computer has an active internet connection</p>
              <div
                className="sidebar-network-link"
                style={{ display: "flex", alignItems: "center" }}
              >
                <a href="/#">Reconnect</a>
                <Icons.ArrowForwardIosIcon className={classes.rightArrowIcon} />
              </div>
            </div>
          </div>
        </div>
      </Offline>

      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <IconButton
            aria-label="search"
            className={classes.icon}
            onClick={() => sidebarSearchRef.current.focus()}
          >
            <Icons.SearchOutlinedIcon />
          </IconButton>
          <input
            placeholder="Search or start a new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={sidebarSearchRef}
          />
        </div>
        <IconButton aria-label="filter" className={classes.icon}>
          <Icons.FilterListRoundedIcon />
        </IconButton>
      </div>

      <div className="sidebar-chat">
        {searchItem.length > 0
          ? searchItem
          : friendList.map((friend, id) => (
              <SidebarChat
                key={id}
                name={friend.data().fullname}
                photoURL={friend.data().photoURL}
                lastMessage={friend.data().lastMessage}
                email={friend.data().email}
                time={friend.data().timestamp}
                messageType={friend.data().messageType}
                messageSent={friend.data().messageSent}
                messageRead={friend.data().messageRead}
                typingIndicator={friend.data().typing}
                setChat={props.setChat}
                setEmailId={props.setEmailId}
              />
            ))}
      </div>
    </div>
  );
}

export default React.memo(Sidebar);

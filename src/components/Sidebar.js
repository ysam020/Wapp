import React, { useState, useRef } from "react";
// Styles
import "../styles/sidebar.css";
// Components
import SidebarChat from "./SidebarChat";
import SidebarSearchedUser from "./SidebarSearchedUser";
import * as Icons from "./Icons";
import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Offline } from "react-detect-offline";
// Custom hooks
import useContexts from "../customHooks/contexts";
import useGetUsers from "../customHooks/getUsers";
import useGetFriends from "../customHooks/getFriends";
import useSidebarPopover from "../customHooks/sidebarPopover";

///////////////////////////////////////////////////////////////////
function Sidebar(props) {
  // useState
  const [searchInput, setSearchInput] = useState("");
  const [sidebarPopover, setSidebarPopover] = useState(false);

  // useRef
  const sidebarSearchRef = useRef();

  // Custom hooks
  const { currentUser } = useContexts();

  const sidebarPopoverList = useSidebarPopover(props.toggleDrawer);
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
          onClick={props.toggleDrawer("sidebarProfile", true)}
        >
          <Avatar src={currentUser.photoURL} alt={currentUser.fullname} />
        </IconButton>
        <div className="sidebar-header-right">
          <IconButton
            aria-label="communities"
            onClick={props.toggleDrawer("communities", true)}
          >
            <Icons.GroupsRoundedIcon color="primary" />
          </IconButton>
          <IconButton aria-label="status">
            <Icons.DonutLargeSharpIcon color="primary" />
          </IconButton>

          <IconButton
            aria-label="new-chat"
            onClick={props.toggleDrawer("newChat", true)}
          >
            <Icons.ChatRoundedIcon color="primary" />
          </IconButton>

          <div className="sidebar-popover-container">
            <IconButton
              aria-label="more"
              onClick={(event) => {
                event.stopPropagation();
                handleSidebarPopover();
              }}
              color="primary"
            >
              <Icons.MoreVertRoundedIcon color="primary" />
              <ClickAwayListener onClickAway={handleClickAway}>
                <div
                  className={
                    sidebarPopover
                      ? "sidebar-popover sidebar-popover-open"
                      : "sidebar-popover"
                  }
                >
                  {sidebarPopoverList.map((item) => {
                    return (
                      <h4 key={item.id} onClick={item.onClick}>
                        {item.name}
                      </h4>
                    );
                  })}
                </div>
              </ClickAwayListener>
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
                  <Icons.WifiOffIcon color="warning" />
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
                <Icons.ArrowForwardIosIcon
                  sx={{ width: "12px !important" }}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </Offline>

      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <IconButton
            aria-label="search"
            onClick={() => sidebarSearchRef.current.focus()}
          >
            <Icons.SearchOutlinedIcon color="primary" />
          </IconButton>
          <input
            placeholder="Search or start a new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={sidebarSearchRef}
          />
        </div>
        <IconButton aria-label="filter">
          <Icons.FilterListRoundedIcon color="primary" />
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

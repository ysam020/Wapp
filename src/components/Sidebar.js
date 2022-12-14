import React, { useState, useEffect, useContext } from "react";
import "../styles/sidebar.css";
import {
  UserContext,
  LogoutContext,
  ToggleSidebarProfileContext,
  ToggleSettingsContext,
  ToggleSidebarContext,
} from "../contexts/Context";
import { Avatar } from "@material-ui/core";
import db from "../firebase";
import SidebarChat from "./SidebarChat";
import SidebarSearchedUser from "./SidebarSearchedUser";
import DonutLargeSharpIcon from "@mui/icons-material/DonutLargeSharp";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
  })
);

function Sidebar() {
  // MUI Styles
  const classes = useStyles();

  const [allUsers, setAllUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [sidebarPopover, setSidebarPopover] = useState(false);

  // Contexts
  const logout = useContext(LogoutContext);
  const currentUser = useContext(UserContext);
  const toggleSidebarProfileContext = useContext(ToggleSidebarProfileContext);
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);

  useEffect(() => {
    // Get all users from database
    const getAllUsers = async () => {
      db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(
          snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email) // Get all users whose email id is not same as the email of current user
        );
      });
    };

    // Get friends from FriendList databse
    const getFriends = async () => {
      db.collection("FriendList")
        .doc(currentUser.email)
        .collection("list")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setFriendList(snapshot.docs);
        });
    };

    getAllUsers();
    getFriends();
  });

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
          onClick={() => {
            toggleSidebarProfileContext.toggleSidebarProfileDispatch("toggle");
            toggleSidebarContext.toggleSidebarDispatch("toggle");
          }}
        >
          <Avatar src={currentUser.photoURL} />
        </IconButton>

        <div className="sidebar-header-right">
          <IconButton className={classes.icon}>
            <DonutLargeSharpIcon />
          </IconButton>

          <IconButton className={classes.icon}>
            <ChatRoundedIcon />
          </IconButton>

          <div className="sidebar-popover-container">
            <IconButton onClick={handleSidebarPopover} className={classes.icon}>
              <MoreVertRoundedIcon />
              {sidebarPopover && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className="sidebar-popover">
                    <h4>New Group</h4>
                    <h4>Starred Message</h4>
                    <h4
                      onClick={() => {
                        toggleSettingsContext.toggleSettingsDispatch("toggle");
                        toggleSidebarContext.toggleSidebarDispatch("toggle");
                      }}
                    >
                      Settings
                    </h4>
                    <h4 onClick={logout}>Logout</h4>
                  </div>
                </ClickAwayListener>
              )}
            </IconButton>
          </div>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <IconButton className={classes.icon}>
            <SearchOutlinedIcon />
          </IconButton>
          <input
            placeholder="Search or start a new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <IconButton className={classes.icon}>
          <FilterListRoundedIcon />
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
              />
            ))}
      </div>
    </div>
  );
}

export default Sidebar;

import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import "../styles/sidebar.css";
import {
  UserContext,
  LogoutContext,
  ToggleSidebarProfileContext,
  ToggleSettingsContext,
  ToggleSidebarContext,
  NewChatContext,
  CommunitiesContext,
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
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Offline } from "react-detect-offline";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
    rightArrowIcon: { width: "12px !important" },
    wifiIcon: { color: "#FFD279" },
  })
);

function Sidebar(props) {
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
  const newChatContext = useContext(NewChatContext);
  const communitiesContext = useContext(CommunitiesContext);

  // Sidebar search ref
  const sidebarSearchRef = useRef();

  var userCollectionRef = db.collection("users");

  var senderFriendListRef = db
    .collection("FriendList")
    .doc(currentUser.email)
    .collection("list");

  // Get all users from database
  const getAllUsers = useCallback(() => {
    userCollectionRef.onSnapshot((snapshot) => {
      setAllUsers(
        snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email) // Get all users whose email id is not same as the email of current user
      );
    });
    // eslint-disable-next-line
  }, [allUsers]);

  // Get friends from FriendList databse
  const getFriends = useCallback(() => {
    senderFriendListRef.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
      setFriendList(snapshot.docs);
    });
    // eslint-disable-next-line
  }, [friendList]);

  useEffect(() => {
    getAllUsers();
    getFriends();
    // eslint-disable-next-line
  }, []);

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
          onClick={() => {
            toggleSidebarProfileContext.toggleSidebarProfileDispatch("toggle");
            toggleSidebarContext.toggleSidebarDispatch("toggle");
          }}
        >
          <Avatar src={currentUser.photoURL} />
        </IconButton>
        <div className="sidebar-header-right">
          <IconButton
            onClick={() => {
              toggleSidebarContext.toggleSidebarDispatch("toggle");
              communitiesContext.communitiesDispatch("toggle");
            }}
          >
            <GroupsRoundedIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.icon}>
            <DonutLargeSharpIcon />
          </IconButton>

          <IconButton
            className={classes.icon}
            onClick={() => {
              toggleSidebarContext.toggleSidebarDispatch("toggle");
              newChatContext.newChatDispatch("toggle");
            }}
          >
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

      <Offline>
        <div className="sidebar-check-network">
          <div
            className="sidebar-network-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="sidebar-network-icon">
              <div className="sidebar-network-wifi-icon-container">
                <IconButton>
                  <WifiOffIcon className={classes.wifiIcon} />
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
                <ArrowForwardIosIcon className={classes.rightArrowIcon} />
              </div>
            </div>
          </div>
        </div>
      </Offline>

      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <IconButton
            className={classes.icon}
            onClick={() => sidebarSearchRef.current.focus()}
          >
            <SearchOutlinedIcon />
          </IconButton>
          <input
            placeholder="Search or start a new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={sidebarSearchRef}
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
                index={id}
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

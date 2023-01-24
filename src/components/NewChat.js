import React, { useContext, useEffect, useRef, useState } from "react";
import "../styles/new-chat.css";
import { ToggleSidebarContext, NewChatContext } from "../contexts/Context";
import SidebarSearchedUser from "./SidebarSearchedUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import db from "../firebase";

const useStyles = makeStyles(() =>
  createStyles({
    backIcon: {
      color: "white",
    },
    icon: {
      color: "#8696A0",
    },
    groupIcon: {
      color: "#fff",
      backgroundColor: "#04A784",
      borderRadius: "50%",
      padding: "15px !important",
    },
  })
);

function NewChat(props) {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const newChatContext = useContext(NewChatContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);

  //   useState
  const [searchInput, setSearchInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  //  Ref
  const newChatSearchRef = useRef();

  useEffect(() => {
    console.log("loaded");
    // Get all users
    const getAllUsers = () => {
      db.collection("users").onSnapshot((snapshot) => {
        setAllUsers(snapshot.docs);
      });
    };

    getAllUsers();
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
      />
    );
  });

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              newChatContext.newChatDispatch("toggle");
              toggleSidebarContext.toggleSidebarDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>New chat</h3>
        </div>
      </div>

      <div className="new-chat-search">
        <div className="sidebar-search-container">
          <IconButton
            className={classes.icon}
            onClick={() => newChatSearchRef.current.focus()}
          >
            <SearchOutlinedIcon />
          </IconButton>
          <input
            placeholder="Search or start a new chat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            ref={newChatSearchRef}
          />
        </div>
      </div>

      <div className="new-chat-body">
        <div className="new-group">
          <IconButton>
            <GroupRoundedIcon className={classes.groupIcon} />
          </IconButton>
          <h3>New group</h3>
        </div>

        <div className="new-community">
          <IconButton>
            <GroupsRoundedIcon className={classes.groupIcon} />
          </IconButton>
          <h3>New community</h3>
        </div>

        <div className="contacts">
          <h2>Contacts on wapp</h2>

          {searchItem.length > 0
            ? searchItem
            : allUsers.map((user, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      toggleSidebarContext.toggleSidebarDispatch("toggle");
                      newChatContext.newChatDispatch("toggle");
                    }}
                  >
                    <SidebarSearchedUser
                      name={user.data().fullname}
                      photoURL={user.data().photoURL}
                      about={user.data().about}
                      email={user.data().email}
                      setChat={props.setChat}
                      setEmailId={props.setEmailId}
                      setSearchInput={setSearchInput}
                    />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(NewChat);

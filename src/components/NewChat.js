import React, { useRef, useState } from "react";
import "../styles/new-chat.css";
import SidebarSearchedUser from "./SidebarSearchedUser";
import { IconButton } from "@material-ui/core";
import * as Icons from "./Icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useContexts from "../customHooks/contexts";
import useGetUsers from "../customHooks/getUsers";

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
  const { newChatDispatch, toggleSidebarDispatch } = useContexts();

  //   useState
  const [searchInput, setSearchInput] = useState("");

  //  Ref
  const newChatSearchRef = useRef();

  const { allUsers } = useGetUsers();

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
            aria-label="back"
            className={classes.backIcon}
            onClick={() => {
              newChatDispatch("toggle");
              toggleSidebarDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon />
          </IconButton>
          <h3>New chat</h3>
        </div>
      </div>

      <div className="new-chat-search">
        <div className="sidebar-search-container">
          <IconButton
            aria-label="search"
            className={classes.icon}
            onClick={() => newChatSearchRef.current.focus()}
          >
            <Icons.SearchOutlinedIcon />
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
        {!searchInput && (
          <>
            <div className="new-group">
              <IconButton aria-label="group">
                <Icons.GroupRoundedIcon className={classes.groupIcon} />
              </IconButton>
              <h3>New group</h3>
            </div>

            <div className="new-community">
              <IconButton aria-label="communities">
                <Icons.GroupsRoundedIcon className={classes.groupIcon} />
              </IconButton>
              <h3>New community</h3>
            </div>
          </>
        )}

        <div className="contacts">
          <h2>Contacts on wapp</h2>

          {searchItem.length > 0
            ? searchItem
            : allUsers.map((user, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => {
                      toggleSidebarDispatch("toggle");
                      newChatDispatch("toggle");
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

import React, { useRef, useState } from "react";
// Styles
import "../styles/new-chat.css";
// Components
import SidebarSearchedUser from "./SidebarSearchedUser";
import * as Icons from "./Icons";
import { IconButton } from "@material-ui/core";
// MUI
import { createStyles, makeStyles } from "@material-ui/core/styles";
// Custom hooks
import useGetUsers from "../customHooks/getUsers";

// MUI styles
const useStyles = makeStyles(() =>
  createStyles({
    groupIcon: {
      backgroundColor: "#04A784",
      borderRadius: "50%",
      padding: "15px !important",
    },
  })
);

///////////////////////////////////////////////////////////////////
function NewChat(props) {
  // MUI Styles
  const classes = useStyles();

  // useState
  const [searchInput, setSearchInput] = useState("");

  // Ref
  const newChatSearchRef = useRef();

  // Custom hooks
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
        user={user.data()}
      />
    );
  });

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={props.toggleDrawer("newChat", false)}
          >
            <Icons.ArrowBackIcon color="secondary" />
          </IconButton>
          <h3>New chat</h3>
        </div>
      </div>

      <div className="new-chat-search">
        <div className="sidebar-search-container">
          <IconButton
            aria-label="search"
            onClick={() => newChatSearchRef.current.focus()}
          >
            <Icons.SearchOutlinedIcon color="primary" />
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
                <Icons.GroupRoundedIcon
                  className={classes.groupIcon}
                  color="secondary"
                />
              </IconButton>
              <h3>New group</h3>
            </div>

            <div className="new-community">
              <IconButton aria-label="communities">
                <Icons.GroupsRoundedIcon
                  className={classes.groupIcon}
                  color="secondary"
                />
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
                  <div key={id} onClick={props.toggleDrawer("newChat", false)}>
                    <SidebarSearchedUser
                      name={user.data().fullname}
                      photoURL={user.data().photoURL}
                      about={user.data().about}
                      email={user.data().email}
                      setChat={props.setChat}
                      setChatUser={props.setChatUser}
                      setSearchInput={setSearchInput}
                      user={user.data()}
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

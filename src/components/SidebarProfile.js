import React, { useEffect, useState, useRef } from "react";
// Styles
import "../styles/sidebar-profile.css";
// Components
import * as Icons from "./Icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
// utils
import FirebaseRefs from "./FirebaseRefs";
// Custom hooks
import useContexts from "../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function SidebarProfile() {
  // useState
  const [editNameFocus, setEditNameFocus] = useState(false);
  const [editAboutFocus, setEditAboutFocus] = useState(false);
  const [fullname, setFullname] = useState("");
  const [about, setAbout] = useState("");

  // useRef
  const editNameRef = useRef();
  const editAboutRef = useRef();
  const editNameInputRef = useRef();
  const editAboutInputRef = useRef();

  // Custom hooks
  const {
    currentUser,
    emailId,
    toggleSidebarDispatch,
    toggleSidebarProfileDispatch,
  } = useContexts();

  const firebaseRef = FirebaseRefs(emailId, currentUser);
  // var userRef = db.collection("users").doc(currentUser.email);

  const updateName = () => {
    firebaseRef.userRef.update({ fullname: editNameInputRef.current.value });
    setEditNameFocus(false);
  };

  const updateAbout = () => {
    firebaseRef.userRef.update({ about: editAboutInputRef.current.value });
    setEditAboutFocus(false);
  };

  useEffect(() => {
    firebaseRef.userRef.onSnapshot((snapshot) =>
      setFullname(snapshot.data().fullname)
    );
    firebaseRef.userRef.onSnapshot((snapshot) =>
      setAbout(snapshot.data().about)
    );

    editNameInputRef.current.setSelectionRange(
      editNameInputRef.current.value.length,
      editNameInputRef.current.value.length
    );

    editAboutInputRef.current.setSelectionRange(
      editAboutInputRef.current.value.length,
      editAboutInputRef.current.value.length
    );
    // eslint-disable-next-line
  }, [updateName]);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={() => {
              toggleSidebarProfileDispatch("toggle");
              toggleSidebarDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon color="secondary" />
          </IconButton>
          <h3>Profile</h3>
        </div>
      </div>

      <div className="sidebar-profile-image">
        <Avatar
          src={currentUser.photoURL}
          style={{ height: "200px", width: "200px", margin: "auto" }}
          alt={currentUser.fullname}
        />
      </div>

      <div className="sidebar-profile-body">
        <div className="sidebar-profile-name" ref={editNameRef}>
          <h3>Your name</h3>
          <div
            className={
              editNameFocus
                ? `sidebar-profile-name-container active`
                : `sidebar-profile-name-container`
            }
          >
            <input
              type="text"
              ref={editNameInputRef}
              defaultValue={fullname}
              onFocus={() => setEditNameFocus(true)}
            />
            {!editNameFocus ? (
              <Tooltip title="Click to edit" enterDelay={1000}>
                <IconButton
                  aria-label="edit-name"
                  onClick={() => editNameInputRef.current.focus()}
                >
                  <Icons.ModeEditOutlineIcon color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Click to save" enterDelay={1000}>
                <IconButton aria-label="save-name" onClick={updateName}>
                  <Icons.DoneIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="sidebar-profile-info">
          <h4>
            This is not your username or pin. This name will be visible to all
            your Wapp contacts.
          </h4>
        </div>

        <div className="sidebar-profile-about" ref={editAboutRef}>
          <h3>About</h3>
          <div
            className={
              editAboutFocus
                ? `sidebar-profile-about-container active`
                : `sidebar-profile-about-container`
            }
          >
            <input
              type="text"
              ref={editAboutInputRef}
              defaultValue={about}
              onFocus={() => setEditAboutFocus(true)}
            />
            {!editAboutFocus ? (
              <Tooltip title="Click to edit" enterDelay={1000}>
                <IconButton
                  aria-label="edit-about"
                  onClick={() => editAboutInputRef.current.focus()}
                >
                  <Icons.ModeEditOutlineIcon color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Click to save" enterDelay={1000}>
                <IconButton aria-label="save-about" onClick={updateAbout}>
                  <Icons.DoneIcon color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SidebarProfile);

import React, { useContext, useState, useRef } from "react";
import "../styles/sidebar-profile.css";
import {
  ToggleSidebarContext,
  UserContext,
  ToggleSidebarProfileContext,
} from "../contexts/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DoneIcon from "@mui/icons-material/Done";
import db from "../firebase";
import { useEffect } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    backIcon: {
      color: "white",
    },
    avatarIcon: {
      height: "200px",
      width: "200px",
      margin: "auto",
    },
    editIcon: {
      color: "#8696A0",
    },
  })
);

function SidebarProfile() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleSidebarProfileContext = useContext(ToggleSidebarProfileContext);
  const toggleSidebarContext = useContext(ToggleSidebarContext);

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

  var userRef = db.collection("users").doc(currentUser.email);

  const updateName = () => {
    userRef.update({ fullname: editNameInputRef.current.value });
    setEditNameFocus(false);
  };

  const updateAbout = () => {
    userRef.update({ about: editAboutInputRef.current.value });
    setEditAboutFocus(false);
  };

  useEffect(() => {
    userRef.onSnapshot((snapshot) => setFullname(snapshot.data().fullname));
    userRef.onSnapshot((snapshot) => setAbout(snapshot.data().about));

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
            className={classes.backIcon}
            onClick={() => {
              toggleSidebarProfileContext.toggleSidebarProfileDispatch(
                "toggle"
              );
              toggleSidebarContext.toggleSidebarDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Profile</h3>
        </div>
      </div>

      <div className="sidebar-profile-image">
        <Avatar src={currentUser.photoURL} className={classes.avatarIcon} />
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
                <IconButton onClick={() => editNameInputRef.current.focus()}>
                  <ModeEditOutlineIcon className={classes.editIcon} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Click to save" enterDelay={1000}>
                <IconButton onClick={updateName}>
                  <DoneIcon className={classes.editIcon} />
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
                <IconButton onClick={() => editAboutInputRef.current.focus()}>
                  <ModeEditOutlineIcon className={classes.editIcon} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Click to save" enterDelay={1000}>
                <IconButton onClick={updateAbout}>
                  <DoneIcon className={classes.editIcon} />
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

import React, { useContext } from "react";
import "../styles/sidebar-profile.css";
import {
  ToggleSidebarContext,
  UserContext,
  ToggleSidebarProfileContext,
} from "../contexts/Context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
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
        <div className="sidebar-profile-name">
          <h3>Your name</h3>
          <div className="sidebar-profile-name-container">
            <h3>{currentUser.fullname}</h3>
            <IconButton>
              <ModeEditOutlineIcon className={classes.editIcon} />
            </IconButton>
          </div>
        </div>

        <div className="sidebar-profile-info">
          <h4>
            This is not your username or pin. This name will be visible to all
            your Wapp contacts.
          </h4>
        </div>

        <div className="sidebar-profile-about">
          <h3>About</h3>
          <div className="sidebar-profile-about-container">
            <h3>{currentUser.about}</h3>
            <IconButton>
              <ModeEditOutlineIcon className={classes.editIcon} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarProfile;

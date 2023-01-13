import React, { useContext } from "react";
import "../../styles/privacy.css";
import {
  ToggleSettingsContext,
  SettingsPrivacyContext,
} from "../../contexts/Context";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const useStyles = makeStyles((theme) =>
  createStyles({
    backIcon: {
      color: "white",
    },
    icon: { color: "#8696A0" },
  })
);

function Privacy() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const settingsPrivacyContext = useContext(SettingsPrivacyContext);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsContext.toggleSettingsDispatch("toggle");
              settingsPrivacyContext.settingsPrivacyDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Privacy</h3>
        </div>
      </div>

      <div className="privacy-body">
        <div className="privacy-personal-info">
          <h3>Who can see my personal info</h3>

          <div className="privacy-last-seen">
            <div className="privacy-last-seen-container">
              <h4>Last seen and online</h4>
              <p>Nobody, Everyone</p>
            </div>
            <IconButton className={classes.icon}>
              <ChevronRightRoundedIcon />
            </IconButton>
          </div>

          <div className="privacy-profile-photo">
            <div className="privacy-profile-photo-container">
              <h4>Profile Photo</h4>
              <p>Nobody, Everyone</p>
            </div>
            <IconButton className={classes.icon}>
              <ChevronRightRoundedIcon />
            </IconButton>
          </div>

          <div className="privacy-about">
            <div className="privacy-about-container">
              <h4>About</h4>
              <p>Nobody, Everyone</p>
            </div>
            <IconButton className={classes.icon}>
              <ChevronRightRoundedIcon />
            </IconButton>
          </div>

          <div className="privacy-read-receipts">
            <div className="privacy-read-receipts-container">
              <h4>Read receipts</h4>
              <p>
                If turned off, you won't send or receive Read receipts. Read
                receipts are always sent for group chats.
              </p>
            </div>
            <Checkbox
              sx={{
                color: "#8696A0",
                "&.Mui-checked": {
                  color: "#04A784",
                },
              }}
            />
          </div>
        </div>

        <div className="privacy-disappearing-messages">
          <h3>Disappearing messages</h3>
          <div className="privacy-disappearing-messages-container">
            <div className="privacy-disappearing-messages-container-text">
              <h4>Default message timer</h4>
              <p>Off</p>
            </div>
            <IconButton className={classes.icon}>
              <ChevronRightRoundedIcon />
            </IconButton>
          </div>
        </div>

        <div className="privacy-blocked-contacts">
          <div className="privacy-blocked-contacts-container">
            <div className="privacy-groups">
              <div className="privacy-groups-container">
                <h4>Groups</h4>
                <p>0 contacts excluded</p>
              </div>
              <IconButton className={classes.icon}>
                <ChevronRightRoundedIcon />
              </IconButton>
            </div>

            <div className="privacy-blocked">
              <div className="privacy-blocked-container">
                <h4>Blocked contacts</h4>
                <p>0</p>
              </div>
              <IconButton className={classes.icon}>
                <ChevronRightRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Privacy);

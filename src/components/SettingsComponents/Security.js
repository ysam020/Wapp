import React, { useContext } from "react";
import "../../styles/security.css";
import {
  ToggleSettingsContext,
  SettingsSecurityContext,
} from "../../contexts/Context";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DataSaverOffOutlinedIcon from "@mui/icons-material/DataSaverOffOutlined";
import Checkbox from "@mui/material/Checkbox";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    backIcon: {
      color: "white",
    },
    lockIcon: {
      color: "white",
      backgroundColor: "#02CD9E",
      width: "40px !important",
      height: "40px !important",
      borderRadius: "1000px",
      padding: "20px",
    },
    securityListIcon: { color: "#8696a0", paddingRight: "20px" },
  })
);

function Security() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const settingsSecurityContext = useContext(SettingsSecurityContext);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsContext.toggleSettingsDispatch("toggle");
              settingsSecurityContext.settingsSecurityDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Security</h3>
        </div>
      </div>

      <div className="security-body">
        <div className="security-img">
          <IconButton>
            <LockIcon className={classes.lockIcon} />
          </IconButton>
        </div>
        <div className="security-row-1">
          <h3>Your chats and calls are private</h3>
          <p>
            End-to-end encryption keeps your personal messages and calls between
            you and the people you choose. Not even WhatsApp can read or listen
            to them. This includes your:
          </p>
          <div className="security-list">
            <div className="security-list-item">
              <ChatBubbleOutlineOutlinedIcon
                className={classes.securityListIcon}
              />
              <p>Text and voice messages</p>
            </div>

            <div className="security-list-item">
              <LocalPhoneOutlinedIcon className={classes.securityListIcon} />
              <p>Audio and video calls</p>
            </div>

            <div className="security-list-item">
              <AttachFileOutlinedIcon className={classes.securityListIcon} />
              <p>Photos, videos and documents</p>
            </div>

            <div className="security-list-item">
              <LocationOnOutlinedIcon className={classes.securityListIcon} />
              <p>Location sharing</p>
            </div>

            <div className="security-list-item">
              <DataSaverOffOutlinedIcon className={classes.securityListIcon} />
              <p>Status updates</p>
            </div>
            <div className="security-list-item">
              <a href="#">Learn more</a>
            </div>
          </div>
        </div>

        <div className="security-row-2">
          <Checkbox
            sx={{
              color: "#8696A0",
              "&.Mui-checked": {
                color: "#04A784",
              },
            }}
          />
          <div className="security-row-2-text">
            <h4>Show security notifications on this computer</h4>
            <p>
              Get notified when your security code changes for a contact’s
              phone. If you have multiple devices, this setting must be enabled
              on each device where you want to get notifications.
              <a href="#">Learn more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;

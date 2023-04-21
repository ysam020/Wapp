import React from "react";
import "../../styles/security.css";
import securityList from "../../assets/data/SecurityList";
import Checkbox from "@mui/material/Checkbox";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as Icons from "../Icons";
import useContexts from "../../customHooks/contexts";

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
    securityListIcon: {
      color: "#8696a0",
      paddingRight: "20px",
      cursor: "default",
      padding: "5px",
    },
  })
);

function Security() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const { toggleSettingsDispatch, settingsSecurityDispatch } = useContexts();

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsDispatch("toggle");
              settingsSecurityDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon />
          </IconButton>
          <h3>Security</h3>
        </div>
      </div>

      <div className="security-body">
        <div className="security-img">
          <IconButton aria-label="lock">
            <Icons.LockIcon className={classes.lockIcon} />
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
            {securityList.map((val) => {
              const { id, text, icon } = val;

              return (
                <div key={id} className="security-list-item">
                  <IconButton
                    aria-label="security-list"
                    className={classes.securityListIcon}
                    disableRipple={true}
                  >
                    {icon}
                  </IconButton>
                  <p>{text}</p>
                </div>
              );
            })}

            <div className="security-list-item">
              <a href="/#">Learn more</a>
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
              <a href="/#">Learn more</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Security);

import React, { useContext } from "react";
import "../../styles/notifications.css";
import {
  ToggleSettingsContext,
  SettingsNotificationContext,
} from "../../contexts/Context";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles((theme) =>
  createStyles({
    backIcon: {
      color: "white",
    },
  })
);

function Notifications() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const settingsNotificationContext = useContext(SettingsNotificationContext);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              settingsNotificationContext.settingsNotificationDispatch(
                "toggle"
              );
              toggleSettingsContext.toggleSettingsDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <div className="sidebar-profile-text">
            <h3>Notifications</h3>
          </div>
        </div>
      </div>

      <div className="settings-notifications-body">
        <div className="settings-notifications-messages">
          <h3>Messages</h3>
          <div className="notifications-messages-container">
            <div className="notifications-messages-text">
              <h4>Message notifications</h4>
              <p>Show notifications for new messages</p>
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

        <div className="settings-notifications-sounds">
          <div className="notifications-sounds-container">
            <div className="notifications-sounds-text">
              <h4>Sounds</h4>
              <p>Play sounds for incoming messages</p>
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
      </div>
    </div>
  );
}

export default React.memo(Notifications);

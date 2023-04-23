import React from "react";
// Styles
import "../../styles/notifications.css";
// Components
import * as Icons from "../Icons";
import { IconButton } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";

///////////////////////////////////////////////////////////////////
function Notifications(props) {
  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={props.toggleDrawer("notifications", false)}
          >
            <Icons.ArrowBackIcon color="secondary" />
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
            <Checkbox />
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

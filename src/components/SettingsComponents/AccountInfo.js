import React from "react";
// Styles
import "../../styles/account-info.css";
// Components
import { IconButton } from "@material-ui/core";
import * as Icons from "../Icons";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function AccountInfo() {
  // Custom hooks
  const { toggleSettingsDispatch, settingsAccountInfoDispatch } = useContexts();

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={() => {
              toggleSettingsDispatch("toggle");
              settingsAccountInfoDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon color="secondary" />
          </IconButton>
          <h3>Request Account Info</h3>
        </div>
      </div>

      <div className="account-info-body">
        <div className="account-info-img">
          <Icons.FeedRoundedIcon
            color="primary"
            sx={{
              backgroundColor: "#E3F7F1",
              width: "70px !important",
              height: "100px !important",
              borderRadius: "1000px",
              padding: "5px 20px",
            }}
          />
        </div>
        <div className="account-info-row-1">
          <p>
            Create a report of your WhatsApp account information and settings,
            which you can access or port to another app. This report does not
            include your messages.
            <a href="/#">Learn more</a>
          </p>
        </div>

        <div className="account-info-row-2">
          <Icons.AccessTimeIcon color="primary" />
          <div className="account-info-row-2-container">
            <h5>Request Sent</h5>
            <p>Ready by December 5, 2022</p>
          </div>
        </div>

        <div className="account-info-row-3">
          <p>
            Your report will be ready in about 3 days. You'll have a few weeks
            to download your report after it's available.
          </p>
          <br />
          <p>
            Your request will be canceled if you make changes to your account
            such as changing your number or deleting your account.
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(AccountInfo);

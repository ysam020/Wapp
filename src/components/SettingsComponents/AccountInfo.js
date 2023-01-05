import React, { useContext } from "react";
import "../../styles/account-info.css";
import {
  ToggleSettingsContext,
  SettingsAccountInfoContext,
} from "../../contexts/Context";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const useStyles = makeStyles((theme) =>
  createStyles({
    backIcon: {
      color: "white",
    },
    feedIcon: {
      color: "#03CF9C",
      backgroundColor: "#E3F7F1",
      width: "70px !important",
      height: "100px !important",
      borderRadius: "1000px",
      padding: "5px 20px",
    },
    timeIcon: {
      color: "#8696a0",
    },
  })
);

function AccountInfo() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const settingsAccountInfoContext = useContext(SettingsAccountInfoContext);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsContext.toggleSettingsDispatch("toggle");
              settingsAccountInfoContext.settingsAccountInfoDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Request Account Info</h3>
        </div>
      </div>

      <div className="account-info-body">
        <div className="account-info-img">
          <IconButton>
            <FeedRoundedIcon className={classes.feedIcon} />
          </IconButton>
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
          <AccessTimeIcon className={classes.timeIcon} />
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

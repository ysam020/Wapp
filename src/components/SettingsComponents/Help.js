import React, { useContext } from "react";
import "../../styles/help.css";
import {
  ToggleSettingsContext,
  SettingsHelpContext,
  ThemeContext,
} from "../../contexts/Context";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpIcon from "@mui/icons-material/Help";
import GroupsIcon from "@mui/icons-material/Groups";
import FeedIcon from "@mui/icons-material/Feed";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    backIcon: {
      color: "white",
    },
    helpListIcon: {
      color: "#8696A0",
    },
  })
);

const helpList = [
  {
    id: 1,
    name: "Help Center",
    icon: <HelpIcon />,
  },
  {
    id: 2,
    name: "Contact us",
    icon: <GroupsIcon />,
  },
  {
    id: 3,
    name: "Terms and Privacy Policy",
    icon: <FeedIcon />,
  },
];

function Help() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const settingsHelpContext = useContext(SettingsHelpContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsContext.toggleSettingsDispatch("toggle");
              settingsHelpContext.settingsHelpDispatch("toggle");
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <h3>Help</h3>
        </div>
      </div>

      <div className="help-body">
        <div>
          {/* Conditional rendering help component image */}
          {themeContext.theme === "light" ? (
            <img
              src="./assets/images/wapp-help.png"
              className="help-img"
              alt="wapp-light"
            ></img>
          ) : (
            <img
              src="./assets/images/wapp-help-dark.png"
              className="help-img"
              alt="wapp-dark"
            ></img>
          )}

          <p>Version 2.2245.9</p>
        </div>
        <div className="help-list">
          {helpList.map((values) => {
            const { id, name, icon } = values;

            return (
              <div key={id} className="help-list-item">
                <IconButton className={classes.helpListIcon}>{icon}</IconButton>
                <h4>{name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Help;

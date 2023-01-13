import React, { useContext } from "react";
import "../../styles/help.css";
import {
  ToggleSettingsContext,
  SettingsHelpContext,
} from "../../contexts/Context";
import helpList from "../../data/Helplist";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

function Help() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const settingsHelpContext = useContext(SettingsHelpContext);

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
          <div className="help-img-container">
            <div
              className="help-img"
              style={{
                backgroundImage:
                  "url(https://firebasestorage.googleapis.com/v0/b/wapp-c2920.appspot.com/o/assets%2Fimages%2Fwapp-help.png?alt=media&token=2a07ed37-0e9a-442f-becf-bf9c4ba0992e)",
              }}
            ></div>
          </div>

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

export default React.memo(Help);

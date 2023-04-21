import React from "react";
import "../../styles/help.css";
import helpList from "../../assets/data/Helplist";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as Icons from "../Icons";
import wappHelp from "../../assets/images/wapp-help.png";
import useContexts from "../../customHooks/contexts";

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
  const { toggleSettingsDispatch, settingsHelpDispatch } = useContexts();

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsDispatch("toggle");
              settingsHelpDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon />
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
                backgroundImage: `url(${wappHelp})`,
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
                <IconButton
                  aria-label="help-icon"
                  className={classes.helpListIcon}
                >
                  {icon}
                </IconButton>
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

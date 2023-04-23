import React from "react";
// Styles
import "../../styles/help.css";
// Components
import { IconButton } from "@material-ui/core";
import * as Icons from "../Icons";
// Assets
import helpList from "../../assets/data/Helplist";
import wappHelp from "../../assets/images/wapp-help.png";

///////////////////////////////////////////////////////////////////
function Help(props) {
  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={props.toggleDrawer("help", false)}
          >
            <Icons.ArrowBackIcon color="secondary" />
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
                <IconButton aria-label="help-icon">{icon}</IconButton>
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

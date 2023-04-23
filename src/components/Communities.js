import React from "react";
// Styles
import "../styles/communities.css";
// Components
import * as Icons from "./Icons";
import { IconButton } from "@material-ui/core";
import ButtonPrimary from "./ButtonPrimary";
import CommunitiesSVG from "./CommunitiesSVG";

///////////////////////////////////////////////////////////////////
function Communities(props) {
  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={props.toggleDrawer("communities", false)}
          >
            <Icons.ArrowBackIcon color="secondary" />
          </IconButton>
          <h3>Communities</h3>
        </div>
      </div>

      <div className="communities-body">
        <CommunitiesSVG />

        <h1>Introducing communities</h1>
        <p>
          Easily organize your related groups and send announcements. Now, your
          communities, like neighborhoods or schools, can have their own space.
        </p>

        <ButtonPrimary>start a community</ButtonPrimary>
      </div>
    </div>
  );
}

export default React.memo(Communities);

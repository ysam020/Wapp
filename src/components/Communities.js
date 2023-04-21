import React from "react";
import "../styles/communities.css";
import * as Icons from "./Icons";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ButtonPrimary from "./ButtonPrimary";
import useContexts from "../customHooks/contexts";
import CommunitiesSVG from "./CommunitiesSVG";

const useStyles = makeStyles(() =>
  createStyles({
    backIcon: {
      color: "white",
    },
  })
);

function Communities() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const { toggleSidebarDispatch, communitiesDispatch } = useContexts();

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            className={classes.backIcon}
            onClick={() => {
              communitiesDispatch("toggle");
              toggleSidebarDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon />
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

import React from "react";
import "../styles/disappearing-messages.css";
import { disappearingMessagesOptions } from "../assets/data/disappearingMessagesOptions";

// MUI components
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { IconButton } from "@material-ui/core";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material icons
import * as Icons from "./Icons";
import useContexts from "../customHooks/contexts";
import DisappearingMessagesSVG from "./DisappearingMessagesSVG";

const useStyles = makeStyles(() =>
  createStyles({
    icon: { color: "#8696A0" },
    radioTextLight: { color: "#fff" },
    radioTextDark: { color: "#000" },
    radioIcon: { color: "#118C7E" },
  })
);

function DisappearingMessages() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const { disappearingMessagesDispatch, theme } = useContexts();

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          aria-label="close"
          className={classes.icon}
          onClick={() => {
            disappearingMessagesDispatch("toggle");
          }}
        >
          <Icons.CloseRoundedIcon />
        </IconButton>
        <h3>Disappaering messages</h3>
      </div>

      <div className="disappearing-messages-body">
        <div className="disappearing-messages-img">
          <DisappearingMessagesSVG />
        </div>

        <div className="disappearing-messages-text">
          <h4>Make messages in this chat disappear</h4>
          <p>
            For more privacy and storage, all new messages will disappear from
            this chat for everyone after the selected duration. Anyone in the
            chat can change this setting.
            <a href="/#" rel="noreferrer">
              &nbsp;Learn more
            </a>
          </p>
        </div>

        <div className="disappearing-messages-options">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Off"
              name="radio-buttons-group"
            >
              {disappearingMessagesOptions.map((item) => {
                return (
                  <FormControlLabel
                    key={item.id}
                    value={item.name}
                    control={<Radio size="small" />}
                    label={item.name}
                    className={
                      theme === "dark"
                        ? classes.radioTextLight
                        : classes.radioTextDark
                    }
                    sx={{
                      "& .MuiSvgIcon-root": {
                        color: "#118C7E",
                      },
                    }}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>

        <p>
          Update your&nbsp;
          <a href="/#" rel="noreferrer">
            default message timer&nbsp;
          </a>
          in Settings
        </p>
      </div>
    </div>
  );
}

export default React.memo(DisappearingMessages);

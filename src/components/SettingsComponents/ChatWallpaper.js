import React, { useContext } from "react";
import "../../styles/chat-wallpaper.css";
import {
  ToggleSettingsContext,
  ToggleChatWallpaperContext,
  ChatBackgroundContext,
  ThemeContext,
} from "../../contexts/Context";
import chatWallpaperData from "../../data/ChatWallpaperData";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as Icons from "../Icons";

const useStyles = makeStyles((theme) =>
  createStyles({
    backIcon: {
      color: "white",
    },
  })
);

function ChatWallpaper() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const themeContext = useContext(ThemeContext);
  const toggleSettingsContext = useContext(ToggleSettingsContext);
  const toggleChatWallpaperContxt = useContext(ToggleChatWallpaperContext);
  const { setChatBackground, doodle, setDoodle } = useContext(
    ChatBackgroundContext
  );

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            className={classes.backIcon}
            onClick={() => {
              toggleSettingsContext.toggleSettingsDispatch("toggle");
              toggleChatWallpaperContxt.toggleChatWallpaperDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon />
          </IconButton>
          <h3>Chat Wallpaper</h3>
        </div>
      </div>

      <div className="chat-wallpaper-body">
        <div className="chat-wallpaper-doodle">
          <FormControlLabel
            control={
              <Checkbox
                checked={doodle}
                sx={{
                  color: "#8696A0",
                  "&.Mui-checked": {
                    color: "#04A784",
                  },
                }}
                onChange={(e) => {
                  setDoodle(e.target.checked);
                  localStorage.setItem(
                    "doodle",
                    JSON.stringify(e.target.checked ? true : false)
                  );
                }}
              />
            }
            label="Add Wapp Doodles"
            style={{ color: "#667781" }}
          />
        </div>

        <div className="chat-wallpaper-list">
          {themeContext.theme === "light"
            ? chatWallpaperData
                .filter((theme) => {
                  if (theme.theme === "light") {
                    return theme;
                  }
                  return false;
                })
                .map((val) => {
                  const { id, color } = val;

                  return (
                    <div
                      key={id}
                      style={{
                        backgroundColor: `${color}`,
                      }}
                      className="chat-wallpaper-list-item"
                      onClick={() => {
                        setChatBackground(color);
                        localStorage.setItem(
                          "chatBackground",
                          JSON.stringify(color)
                        );
                      }}
                    ></div>
                  );
                })
            : chatWallpaperData
                .filter((theme) => {
                  if (theme.theme === "dark") {
                    return theme;
                  }
                  return false;
                })
                .map((val) => {
                  const { id, color } = val;

                  return (
                    <div
                      key={id}
                      style={{
                        backgroundColor: `${color}`,
                      }}
                      className="chat-wallpaper-list-item"
                      onClick={() => {
                        setChatBackground(color);
                        localStorage.setItem(
                          "chatBackground",
                          JSON.stringify(color)
                        );
                      }}
                    ></div>
                  );
                })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChatWallpaper);

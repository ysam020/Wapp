import React from "react";
// Styles
import "../../styles/chat-wallpaper.css";
// Components
import * as Icons from "../Icons";
import { IconButton } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// Assets
import chatWallpaperData from "../../assets/data/ChatWallpaperData";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function ChatWallpaper() {
  // Custom hooks
  const {
    toggleSettingsDispatch,
    theme,
    toggleChatWallpaperDispatch,
    setChatBackground,
    doodle,
    setDoodle,
  } = useContexts();

  return (
    <div className="sidebar-panel">
      <div className="sidebar-panel-header">
        <div className="sidebar-panel-header-container">
          <IconButton
            aria-label="back"
            onClick={() => {
              toggleSettingsDispatch("toggle");
              toggleChatWallpaperDispatch("toggle");
            }}
          >
            <Icons.ArrowBackIcon color="secondary" />
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
          />
        </div>

        <div className="chat-wallpaper-list">
          {theme === "light"
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

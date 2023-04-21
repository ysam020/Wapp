import React from "react";
import "../../styles/settings.css";

import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

// MUI components
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import Switch from "@mui/material/Switch";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";

// Material icons
import * as Icons from "../Icons";
import useContexts from "../../customHooks/contexts";
import useSettingsList from "../../customHooks/settingsList";

const useStyles = makeStyles(() =>
  createStyles({
    backIcon: {
      color: "white",
    },
    avatarIcon: {
      height: "80px",
      width: "80px",
    },
    settingsListIcon: {
      color: "#8696A0",
    },
  })
);

// Theme Switch Styles
const ThemeSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#015C4B",
    "&:hover": {
      backgroundColor: "#015C4B, theme.palette.action.hoverOpacity)",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#015C4B",
  },
}));

function Settings() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const {
    currentUser,
    toggleSettingsDispatch,
    toggleSidebarDispatch,
    theme,
    toggleTheme,
    setChatBackground,
  } = useContexts();

  const {
    settingsList,
    openModal,
    setOpenModal,
    handleOpenModal,
    handleCloseModal,
  } = useSettingsList();

  return (
    <>
      <KeyboardShortcutsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <div className="sidebar-panel">
        <div className="sidebar-panel-header">
          <div className="sidebar-panel-header-container">
            <IconButton
              aria-label="back"
              className={classes.backIcon}
              onClick={() => {
                toggleSettingsDispatch("toggle");
                toggleSidebarDispatch("toggle");
              }}
            >
              <Icons.ArrowBackIcon />
            </IconButton>
            <h3>Settings</h3>
          </div>
        </div>

        <div className="settings-body">
          <div className="settings-user-info">
            <div className="settings-user-info-image"></div>
            <Avatar
              src={currentUser.photoURL}
              className={classes.avatarIcon}
              alt={currentUser.fullname}
            />
            <div className="settings-user-info-text">
              <h3>{currentUser.fullname}</h3>
              <p>{currentUser.about}</p>
            </div>
          </div>

          <div className="settings-list">
            {settingsList.map((values) => {
              const { id, name, icon, style, onClick } = values;

              return (
                <div key={id} className={style} onClick={onClick}>
                  <IconButton
                    aria-label="settings-list"
                    className={classes.settingsListIcon}
                  >
                    {icon}
                  </IconButton>
                  <h5>{name}</h5>

                  {/* Show theme switch button only if name = dark theme when mapping */}
                  {name === "Dark theme" && (
                    <ThemeSwitch
                      onChange={toggleTheme}
                      onClick={() => {
                        setChatBackground(
                          theme === "light" ? "#EFEAE2" : "#0C141A"
                        );
                        localStorage.setItem(
                          "chatBackground",
                          JSON.stringify(
                            theme === "light" ? "#0C141A" : "#EFEAE2"
                          )
                        );
                      }}
                      checked={theme === "dark"}
                      inputProps={{ "aria-label": "controlled" }}
                      sx={{
                        color: "#8696A0",
                        "&.Mui-checked": {
                          color: "#04A784",
                        },
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Settings);

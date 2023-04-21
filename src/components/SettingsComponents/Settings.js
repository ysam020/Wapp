import React from "react";
// Styles
import "../../styles/settings.css";
// Components
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";
import * as Icons from "../Icons";
import { IconButton } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import Switch from "@mui/material/Switch";
// Custom hooks
import useContexts from "../../customHooks/contexts";
import useSettingsList from "../../customHooks/settingsList";

///////////////////////////////////////////////////////////////////
function Settings() {
  // Custom hooks
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
              onClick={() => {
                toggleSettingsDispatch("toggle");
                toggleSidebarDispatch("toggle");
              }}
            >
              <Icons.ArrowBackIcon color="secondary" />
            </IconButton>
            <h3>Settings</h3>
          </div>
        </div>

        <div className="settings-body">
          <div className="settings-user-info">
            <div className="settings-user-info-image"></div>
            <Avatar
              src={currentUser.photoURL}
              style={{ height: "80px", width: "80px" }}
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
                  <IconButton aria-label="settings-list">{icon}</IconButton>
                  <h5>{name}</h5>

                  {/* Show theme switch button only if name = dark theme when mapping */}
                  {name === "Dark theme" && (
                    <Switch
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

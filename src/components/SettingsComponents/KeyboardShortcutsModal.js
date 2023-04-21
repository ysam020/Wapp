import React from "react";
// Styles
import "../../styles/keyboard-shortcuts.css";
// Components
import Modal from "@mui/material/Modal";
// Assets
import keyboardShortcuts from "../../assets/data/KeyboardShortcuts";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function KeyboardShortcutsModal(props) {
  // Custom hooks
  const { theme } = useContexts();

  return (
    <Modal open={props.openModal} onClose={props.handleCloseModal}>
      <div
        className={
          theme === "light"
            ? "modal-container modal-container-light"
            : "modal-container modal-container-dark"
        }
      >
        <h3>Keyboard shortcuts</h3>
        <div>
          <div className="cmd-list-container">
            {keyboardShortcuts.map((val) => {
              const { id, name, command } = val;
              return (
                <div key={id} className="cmd-list-item">
                  <h4>{name}</h4>
                  <div className="cmd-btn-container">
                    {command.map((command, id) => {
                      const { cmd } = command;
                      return (
                        <span key={id} className="cmd-btn">
                          {cmd}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={() => props.setOpenModal(false)}>OK</button>
      </div>
    </Modal>
  );
}

export default React.memo(KeyboardShortcutsModal);

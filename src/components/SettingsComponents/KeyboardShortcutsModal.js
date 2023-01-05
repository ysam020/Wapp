import React, { useContext } from "react";
import "../../styles/keyboard-shortcuts.css";
import Modal from "@mui/material/Modal";
import keyboardShortcuts from "../../data/KeyboardShortcuts";
import { ThemeContext } from "../../contexts/Context";

function KeyboardShortcutsModal({ openModal, handleCloseModal, setOpenModal }) {
  const themeContext = useContext(ThemeContext);
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <div
        className={
          themeContext.theme === "light"
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
        <button onClick={() => setOpenModal(false)}>OK</button>
      </div>
    </Modal>
  );
}

export default KeyboardShortcutsModal;

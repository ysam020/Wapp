import React, { useState } from "react";
// Styles
import "../styles/report.css";
// Components
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
// utils
import { deleteChat } from "../utils/deleteChat";
import { blockUser } from "../utils/blockUser";
// Custom hooks
import useContexts from "../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function ReportShortcutsModal(props) {
  // useState
  const [checked, setChecked] = useState(true);

  // Custom hooks
  const { theme, currentUser, chatDetailsContext } = useContexts();

  return (
    <Modal open={props.openModal} onClose={props.handleCloseModal}>
      <div
        className={
          theme === "light"
            ? "report-modal-container report-modal-container-light"
            : "report-modal-container report-modal-container-dark"
        }
      >
        <div className="report-modal-header">
          <h3>Report this contact to Wapp?</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              defaultChecked
              sx={{
                color: "#8696A0",
                "&.Mui-checked": {
                  color: "#04A784",
                },
              }}
              onChange={(event) => {
                if (event.target.checked) {
                  setChecked(true);
                } else {
                  setChecked(false);
                }
              }}
            />
            <p>Block contact and clear chat</p>
          </div>
        </div>

        <div className="report-modal-body">
          <p>
            The last 5 messages from this contact will be forwarded to Wapp. If
            you block this contact and clear the chat, messages will only be
            removed from this device and your devices on the newer versions of
            Wapp.
          </p>
          <br />
          <p>This contact will not be notified.</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingTop: "30px",
          }}
        >
          <button
            className="report-modal-cancel"
            onClick={() => props.setOpenModal(false)}
          >
            Cancel
          </button>
          <button
            className="report-modal-report"
            onClick={() => {
              props.setOpenModal(false);
              if (checked === true) {
                blockUser(currentUser, chatDetailsContext.chatUser.email);
                deleteChat(
                  chatDetailsContext.chatUser.email,
                  currentUser,
                  props.setChat
                );
              }
            }}
          >
            Report
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default React.memo(ReportShortcutsModal);

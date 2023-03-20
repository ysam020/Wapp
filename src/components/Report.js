import React, { useContext, useState } from "react";
import "../styles/report.css";
import Modal from "@mui/material/Modal";
import { ThemeContext, ToggleContactInfoContext } from "../contexts/Context";
import Checkbox from "@mui/material/Checkbox";
import { deleteChat } from "../utils/deleteChat";
import { UserContext } from "../contexts/Context";
import db from "../firebase";

function KeyboardShortcutsModal(props) {
  // Context
  const themeContext = useContext(ThemeContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const currentUser = useContext(UserContext);

  if (props.emailId) {
    var senderMessageCollectionRef = db
      .collection("chats")
      .doc(currentUser.email)
      .collection("messages");

    var receiverMessageCollectionRef = db
      .collection("chats")
      .doc(props.emailId)
      .collection("messages");

    var senderFriendListRef = db
      .collection("FriendList")
      .doc(currentUser.email)
      .collection("list")
      .doc(props.emailId);

    var receiverFriendListRef = db
      .collection("FriendList")
      .doc(props.emailId)
      .collection("list")
      .doc(currentUser.email);
  }

  // useState
  const [checked, setChecked] = useState(true);

  return (
    <Modal open={props.openModal} onClose={props.handleCloseModal}>
      <div
        className={
          themeContext.theme === "light"
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
                props.blockUser();
                deleteChat(
                  props.emailId,
                  currentUser,
                  senderMessageCollectionRef,
                  receiverMessageCollectionRef,
                  senderFriendListRef,
                  receiverFriendListRef,
                  props.setChat
                );
                toggleContactInfoContext.toggleContactInfoDispatch("toggle");
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

export default React.memo(KeyboardShortcutsModal);

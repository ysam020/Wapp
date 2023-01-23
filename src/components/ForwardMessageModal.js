import React, { useContext, useState, useRef, useEffect } from "react";
import "../styles/forward-message.css";
import Modal from "@mui/material/Modal";
import { ThemeContext } from "../contexts/Context";
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SendIcon from "@mui/icons-material/Send";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import db from "../firebase";
import Checkbox from "@mui/material/Checkbox";
import { UserContext } from "../contexts/Context";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696A0 !important",
    },
    sendIcon: { color: "#fff" },
  })
);

function ForwardMessageModal({
  openModal,
  handleCloseModal,
  selectedUser,
  setSelectedUser,
  selectedMessages,
}) {
  // MUI Styles
  const classes = useStyles();

  // Context
  const themeContext = useContext(ThemeContext);
  const currentUser = useContext(UserContext);

  // Usestate
  const [searchInput, setSearchInput] = useState("");
  const [users, setusers] = useState([]);

  // Forward message search ref
  const forwardMessageSearchRef = useRef();

  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setusers(snapshot.docs);
    });
  });

  const handleForwardMessage = () => {
    db.collection("chats")
      .doc(currentUser.email)
      .collection("messages")
      .where("messageId", "==", selectedMessages)
      .get()
      .then((querySnapshot) => {});

    handleCloseModal();
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <div
        className={
          themeContext.theme === "light"
            ? "forward-message-modal-container forward-message-modal-container-light"
            : "forward-message-modal-container forward-message-modal-container-dark"
        }
      >
        <div className="forward-message-modal-header">
          <IconButton
            className={classes.icon}
            onClick={() => {
              handleCloseModal();
            }}
          >
            <CloseIcon />
          </IconButton>
          <h3>Forward message to</h3>
        </div>

        <div className="forward-message-search">
          <div className="forward-message-search-container">
            <IconButton
              className={classes.icon}
              onClick={() => forwardMessageSearchRef.current.focus()}
            >
              <SearchOutlinedIcon />
            </IconButton>
            <input
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              ref={forwardMessageSearchRef}
            />
          </div>
        </div>

        <div className="forward-message-body">
          <h4>Recent chats</h4>

          {users.map((user, id) => {
            return (
              <div className="forward-message-list-item" key={id}>
                <Checkbox
                  sx={{
                    color: "#8696A0",
                    "&.Mui-checked": {
                      color: "#04A784",
                    },
                  }}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedUser([...selectedUser, user.data().email]);
                    } else {
                      setSelectedUser(
                        selectedUser.filter(
                          (item) => item !== user.data().email
                        )
                      );
                    }
                  }}
                />
                <div className="user-data">
                  <Avatar src={user.data().photoURL} />
                  <div className="user-data-text">
                    <h5>{user.data().fullname}</h5>
                    <p>{user.data().about}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedUser.length !== 0 && (
          <div className="forward-message-footer">
            <div className="forward-message-footer-user-info">
              {selectedUser.map((user, id) => {
                return <p key={id}>{`${user},`}&nbsp;</p>;
              })}
            </div>
            <div
              className="forward-message-send-icon"
              onClick={handleForwardMessage}
            >
              <SendIcon className={classes.sendIcon} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ForwardMessageModal;
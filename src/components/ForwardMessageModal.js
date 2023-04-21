import React, { useState, useRef } from "react";
import "../styles/forward-message.css";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton } from "@mui/material";
import * as Icons from "./Icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Checkbox from "@mui/material/Checkbox";
import useContexts from "../customHooks/contexts";
import useGetUsers from "../customHooks/getUsers";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696A0 !important",
    },
    sendIcon: { color: "#fff" },
  })
);

function ForwardMessageModal() {
  // MUI Styles
  const classes = useStyles();

  // Context
  const { theme, chatDetailsContext } = useContexts();

  // Usestate
  const [searchInput, setSearchInput] = useState("");

  // Forward message search ref
  const forwardMessageSearchRef = useRef();

  const { allUsers } = useGetUsers();

  return (
    <Modal
      open={chatDetailsContext.openModal}
      onClose={chatDetailsContext.handleCloseModal}
    >
      <div
        className={
          theme === "light"
            ? "forward-message-modal-container forward-message-modal-container-light"
            : "forward-message-modal-container forward-message-modal-container-dark"
        }
      >
        <div className="forward-message-modal-header">
          <IconButton
            aria-label="close"
            className={classes.icon}
            onClick={() => {
              chatDetailsContext.handleCloseModal();
            }}
          >
            <Icons.CloseIcon />
          </IconButton>
          <h3>Forward message to</h3>
        </div>

        <div className="forward-message-search">
          <div className="forward-message-search-container">
            <IconButton
              className={classes.icon}
              onClick={() => forwardMessageSearchRef.current.focus()}
            >
              <Icons.SearchOutlinedIcon />
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

          {allUsers.map((user, id) => {
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
                      chatDetailsContext.setSelectedUser([
                        ...chatDetailsContext.selectedUser,
                        user.data().email,
                      ]);
                    } else {
                      chatDetailsContext.setSelectedUser(
                        chatDetailsContext.selectedUser.filter(
                          (item) => item !== user.data().email
                        )
                      );
                    }
                  }}
                />
                <div className="user-data">
                  <Avatar
                    src={user.data().photoURL}
                    alt={user.data().fullname}
                  />
                  <div className="user-data-text">
                    <h5>{user.data().fullname}</h5>
                    <p>{user.data().about}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {chatDetailsContext.selectedUser.length !== 0 && (
          <div className="forward-message-footer">
            <div className="forward-message-footer-user-info">
              {chatDetailsContext.selectedUser.map((user, id) => {
                return <p key={id}>{`${user},`}&nbsp;</p>;
              })}
            </div>
            <div className="forward-message-send-icon">
              <Icons.SendIcon className={classes.sendIcon} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default React.memo(ForwardMessageModal);

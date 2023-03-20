import React, { useContext, useState, useRef, useEffect } from "react";
import "../styles/forward-message.css";
import Modal from "@mui/material/Modal";
import { ThemeContext } from "../contexts/Context";
import { Avatar, IconButton } from "@mui/material";
import * as Icons from "./Icons";
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

function ForwardMessageModal(props) {
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

  var usersCollectionRef = db.collection("users");

  var senderMessageCollectionRef = db
    .collection("chats")
    .doc(currentUser.email)
    .collection("messages");

  useEffect(() => {
    usersCollectionRef.onSnapshot((snapshot) => {
      setusers(snapshot.docs);
    });
    // eslint-disable-next-line
  }, []);

  const handleForwardMessage = () => {
    senderMessageCollectionRef
      .where("messageId", "==", props.selectedMessages)
      .get()
      .then((querySnapshot) => {});

    props.handleCloseModal();
  };

  return (
    <Modal open={props.openModal} onClose={props.handleCloseModal}>
      <div
        className={
          themeContext.theme === "light"
            ? "forward-message-modal-container forward-message-modal-container-light"
            : "forward-message-modal-container forward-message-modal-container-dark"
        }
      >
        <div className="forward-message-modal-header">
          <IconButton
            aria-label="close"
            className={classes.icon}
            onClick={() => {
              props.handleCloseModal();
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
                      props.setSelectedUser([
                        ...props.selectedUser,
                        user.data().email,
                      ]);
                    } else {
                      props.setSelectedUser(
                        props.selectedUser.filter(
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

        {props.selectedUser.length !== 0 && (
          <div className="forward-message-footer">
            <div className="forward-message-footer-user-info">
              {props.selectedUser.map((user, id) => {
                return <p key={id}>{`${user},`}&nbsp;</p>;
              })}
            </div>
            <div
              className="forward-message-send-icon"
              onClick={handleForwardMessage}
            >
              <Icons.SendIcon className={classes.sendIcon} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default React.memo(ForwardMessageModal);

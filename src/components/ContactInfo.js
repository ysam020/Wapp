import React, { useState, useEffect, useContext } from "react";
import "../styles/contact-info.css";
import db from "../firebase";
import {
  UserContext,
  ToggleContactInfoContext,
  EncryptionContext,
  DisappearingMessagesContext,
  StarredMessageContext,
  EmailContext,
} from "../contexts/Context";

// MUI components
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material icons
import * as Icons from "./Icons";

import Report from "./Report";
import { deleteChat } from "../utils/deleteChat";

const useStyles = makeStyles((theme) =>
  createStyles({
    avatarIcon: {
      height: "200px",
      width: "200px",
      margin: "auto",
    },
    icon: { color: "#8696A0" },
    redIcon: {
      color: "#F15C6D",
    },
  })
);

// Contact Info Switch Button
const ThemeSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#015C4B",
    "&:hover": {
      backgroundColor: "#015C4B, theme.palette.action.hoverOpacity",
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#015C4B",
  },
}));

function ContactInfo(props) {
  // MUI Styles
  const classes = useStyles();

  // UseState
  const [chatUser, setChatUser] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const encryptionContext = useContext(EncryptionContext);
  const disappearingMessagesContext = useContext(DisappearingMessagesContext);
  const starredMessageContext = useContext(StarredMessageContext);
  const emailId = useContext(EmailContext);

  if (emailId) {
    var senderMessageCollectionRef = db
      .collection("chats")
      .doc(currentUser.email)
      .collection("messages");

    var receiverMessageCollectionRef = db
      .collection("chats")
      .doc(emailId)
      .collection("messages");

    var senderFriendListRef = db
      .collection("FriendList")
      .doc(currentUser.email)
      .collection("list")
      .doc(emailId);

    var receiverFriendListRef = db
      .collection("FriendList")
      .doc(emailId)
      .collection("list")
      .doc(currentUser.email);
  }

  var chatUserRef = db.collection("users").doc(emailId);

  var blockedUserCollectionRef = db
    .collection("blockedUser")
    .doc(currentUser.email)
    .collection("list");

  useEffect(() => {
    // Get users from database
    const getUser = async () => {
      chatUserRef.onSnapshot((snapshot) => {
        setChatUser(snapshot.data());
      });
    };

    const checkBlockedUser = () => {
      blockedUserCollectionRef.onSnapshot((snapshot) => {
        props.setBlock(
          snapshot.docs.filter((doc) => doc.data().email === chatUser?.email)
        );
      });
    };

    getUser();
    checkBlockedUser();
    // eslint-disable-next-line
  }, [chatUser.email, emailId]); // Run whenever chatUser changes

  // Block user function
  const blockUser = () => {
    blockedUserCollectionRef.doc(chatUser.email).set({
      email: chatUser.email,
    });
  };

  // Unblock user function
  const unblockUser = () => {
    blockedUserCollectionRef.doc(emailId).delete();
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <div className="sidebar-panel-right">
        <div className="sidebar-panel-right-header">
          <IconButton
            aria-label="close"
            className={classes.icon}
            onClick={() =>
              toggleContactInfoContext.toggleContactInfoDispatch("toggle")
            }
          >
            <Icons.CloseRoundedIcon />
          </IconButton>
          <h3>Contact info</h3>
        </div>

        <div className="contact-info-img">
          <Avatar
            src={chatUser.photoURL}
            className={classes.avatarIcon}
            alt={chatUser.fullname}
          />
          <h3>{chatUser.email}</h3>
        </div>

        <div className="contact-info-about">
          <h5>About</h5>
          <p>{chatUser.about}</p>
        </div>

        <div className="contact-info-media">
          <h5>Media, links and documents</h5>
          <div className="media-right-container">
            <p>0</p>
            <IconButton aria-label="right-arrow" className={classes.icon}>
              <Icons.KeyboardArrowRightRoundedIcon />
            </IconButton>
          </div>
        </div>

        <div className="contact-info-body">
          <div
            className="starred-messages"
            onClick={() => {
              toggleContactInfoContext.toggleContactInfoDispatch("toggle");
              starredMessageContext.starredMessageDispatch("toggle");
            }}
          >
            <IconButton aria-label="star-messages" className={classes.icon}>
              <Icons.StarRateRoundedIcon />
            </IconButton>
            <h5>Starred messages</h5>
            <IconButton aria-label="right-arrow" className={classes.icon}>
              <Icons.KeyboardArrowRightRoundedIcon />
            </IconButton>
          </div>

          <div className="mute-notification">
            <IconButton aria-label="notifications" className={classes.icon}>
              <Icons.NotificationsRoundedIcon />
            </IconButton>
            <h5>Mute notifications</h5>
            <ThemeSwitch />
          </div>

          <div
            className="disappearing-messages"
            onClick={() => {
              toggleContactInfoContext.toggleContactInfoDispatch("toggle");
              disappearingMessagesContext.disappearingMessagesDispatch(
                "toggle"
              );
            }}
          >
            <IconButton
              aria-label="disappearing-messages"
              className={classes.icon}
            >
              <Icons.HistoryIcon />
            </IconButton>
            <div className="disappearing-messages-text">
              <h5>Disappearing messages</h5>
              <p>Off</p>
            </div>
            <IconButton aria-label="right-arrow" className={classes.icon}>
              <Icons.KeyboardArrowRightRoundedIcon />
            </IconButton>
          </div>

          <div
            className="encryption"
            onClick={() => {
              toggleContactInfoContext.toggleContactInfoDispatch("toggle");
              encryptionContext.encryptionDispatch("toggle");
            }}
          >
            <IconButton aria-label="encryption" className={classes.icon}>
              <Icons.LockIcon />
            </IconButton>
            <div className="encryption-text">
              <h5>Encryption</h5>
              <p>Messages are end-to-end encrypted. Click to verify.</p>
            </div>
          </div>

          <Tooltip title="Block" enterDelay={1000} enterNextDelay={1000}>
            <div
              className="block"
              // Conditional rendering of classname
              onClick={props.block.length === 0 ? blockUser : unblockUser}
            >
              <IconButton aria-label="block">
                <Icons.BlockIcon className={classes.redIcon} />
              </IconButton>
              <div className="block-text">
                <h5>
                  {/* Conditional rendering of block and unblock text */}
                  {props.block.length === 0
                    ? `Block ${chatUser.email}`
                    : `Unblock ${chatUser.email}`}
                </h5>
              </div>
            </div>
          </Tooltip>

          <Tooltip title="Report" enterDelay={1000} enterNextDelay={1000}>
            <div
              className="report"
              onClick={() => {
                handleOpenModal();
              }}
            >
              <IconButton aria-label="report">
                <Icons.ThumbDownAltIcon className={classes.redIcon} />
              </IconButton>
              <div className="report-text">
                <h5>Report {chatUser.email}</h5>
              </div>
            </div>
          </Tooltip>

          <Tooltip title="Delete chat" enterDelay={1000} enterNextDelay={1000}>
            <div
              className="delete-chat"
              onClick={() =>
                deleteChat(
                  emailId,
                  currentUser,
                  senderMessageCollectionRef,
                  receiverMessageCollectionRef,
                  senderFriendListRef,
                  receiverFriendListRef,
                  props.setChat
                )
              }
            >
              <IconButton aria-label="delete">
                <Icons.DeleteIcon className={classes.redIcon} />
              </IconButton>
              <div className="delete-text">
                <h5>Delete chat</h5>
              </div>
            </div>
          </Tooltip>
        </div>
      </div>

      <Report
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        blockUser={blockUser}
        setChat={props.setChat}
      />
    </>
  );
}

export default React.memo(ContactInfo);

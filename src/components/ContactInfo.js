import React, { useState, useEffect, useContext } from "react";
import "../styles/contact-info.css";
import db from "../firebase";
import {
  UserContext,
  ToggleContactInfoContext,
  EncryptionContext,
  DisappearingMessagesContext,
  StarredMessageContext,
} from "../contexts/Context";

// MUI components
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import HistoryIcon from "@mui/icons-material/History";
import LockIcon from "@mui/icons-material/Lock";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";

import Report from "./Report";

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
  const [block, setBlock] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const encryptionContext = useContext(EncryptionContext);
  const disappearingMessagesContext = useContext(DisappearingMessagesContext);
  const starredMessageContext = useContext(StarredMessageContext);

  useEffect(() => {
    // Get users from database
    const getUser = async () => {
      db.collection("users")
        .doc(props.emailId)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
    };

    const checkBlockedUser = () => {
      db.collection("blockedUser")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setBlock(
            snapshot.docs.filter((doc) => doc.data().email === chatUser?.email)
          );
        });
    };

    getUser();
    checkBlockedUser();
    // eslint-disable-next-line
  }, [chatUser.email, props.emailId]); // Run whenever chatUser changes

  // Block user function
  const blockUser = () => {
    db.collection("blockedUser")
      .doc(currentUser.email)
      .collection("list")
      .doc(chatUser.email)
      .set({
        email: chatUser.email,
      });
  };

  // Unblock user function
  const unblockUser = () => {
    db.collection("blockedUser")
      .doc(currentUser.email)
      .collection("list")
      .doc(props.emailId)
      .delete();
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <div className="sidebar-panel-right">
        <div className="sidebar-panel-right-header">
          <IconButton
            className={classes.icon}
            onClick={() =>
              toggleContactInfoContext.toggleContactInfoDispatch("toggle")
            }
          >
            <CloseRoundedIcon />
          </IconButton>
          <h3>Contact info</h3>
        </div>

        <div className="contact-info-img">
          <Avatar src={chatUser.photoURL} className={classes.avatarIcon} />
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
            <IconButton className={classes.icon}>
              <KeyboardArrowRightRoundedIcon />
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
            <IconButton className={classes.icon}>
              <StarRateRoundedIcon />
            </IconButton>
            <h5>Starred messages</h5>
            <IconButton className={classes.icon}>
              <KeyboardArrowRightRoundedIcon />
            </IconButton>
          </div>

          <div className="mute-notification">
            <IconButton className={classes.icon}>
              <NotificationsRoundedIcon />
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
            <IconButton className={classes.icon}>
              <HistoryIcon />
            </IconButton>
            <div className="disappearing-messages-text">
              <h5>Disappearing messages</h5>
              <p>Off</p>
            </div>
            <IconButton className={classes.icon}>
              <KeyboardArrowRightRoundedIcon />
            </IconButton>
          </div>

          <div
            className="encryption"
            onClick={() => {
              toggleContactInfoContext.toggleContactInfoDispatch("toggle");
              encryptionContext.encryptionDispatch("toggle");
            }}
          >
            <IconButton className={classes.icon}>
              <LockIcon />
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
              onClick={block.length === 0 ? blockUser : unblockUser}
            >
              <IconButton>
                <BlockIcon className={classes.redIcon} />
              </IconButton>
              <div className="block-text">
                <h5>
                  {/* Conditional rendering of block and unblock text */}
                  {block.length === 0
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
              <IconButton>
                <ThumbDownAltIcon className={classes.redIcon} />
              </IconButton>
              <div className="report-text">
                <h5>Report {chatUser.email}</h5>
              </div>
            </div>
          </Tooltip>

          <Tooltip title="Delete chat" enterDelay={1000} enterNextDelay={1000}>
            <div className="delete-chat" onClick={() => props.deleteChat()}>
              <IconButton>
                <DeleteIcon className={classes.redIcon} />
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
        deleteChat={props.deleteChat}
        blockUser={blockUser}
      />
    </>
  );
}

export default React.memo(ContactInfo);

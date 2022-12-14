import React, { useState, useEffect, useContext } from "react";
import "../styles/contact-info.css";
import db from "../firebase";
import { UserContext, ToggleContactInfoContext } from "../contexts/Context";
import { useParams } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import HistoryIcon from "@mui/icons-material/History";
import LockIcon from "@mui/icons-material/Lock";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Avatar, IconButton } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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

function ContactInfo() {
  // MUI Styles
  const classes = useStyles();

  // Get email id from url
  const { emailId } = useParams();

  const [chatUser, setChatUser] = useState({});
  const [block, setBlock] = useState([]);

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);

  useEffect(() => {
    // Get users from database
    const getUser = async () => {
      db.collection("users")
        .doc(emailId)
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
  }, [chatUser, currentUser.email, emailId]); // Run whenever chatUser changes

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
      .doc(emailId)
      .delete();
  };

  return (
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
        <div className="starred-messages">
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

        <div className="disappearing-messages">
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

        <div className="encryption">
          <IconButton className={classes.icon}>
            <LockIcon />
          </IconButton>
          <div className="encryption-text">
            <h5>Encryption</h5>
            <p>Messages are end-to-end encrypted. Click to verify.</p>
          </div>
        </div>

        <div
          className="block"
          // Conditional rendering of classname
          onClick={block.length === 0 ? blockUser : unblockUser}
        >
          <IconButton>
            <BlockIcon className={classes.redIcon} />
          </IconButton>
          <div className="encryption-text">
            <h5>
              {/* Conditional rendering of block and unblock text */}
              {block.length === 0
                ? `Block ${chatUser.email}`
                : `Unblock ${chatUser.email}`}
            </h5>
          </div>
        </div>

        <div className="report">
          <IconButton>
            <ThumbDownAltIcon className={classes.redIcon} />
          </IconButton>
          <div className="encryption-text">
            <h5>Report {chatUser.email}</h5>
          </div>
        </div>

        <div className="delete-chat">
          <IconButton>
            <DeleteIcon className={classes.redIcon} />
          </IconButton>
          <div className="encryption-text">
            <h5>Delete chat</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;

import React, { useState } from "react";
import "../styles/contact-info.css";

// MUI components
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

// MUI styles
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material icons
import * as Icons from "./Icons";

import Report from "./Report";
import useContexts from "../customHooks/contexts";
import useContactInfoActions from "../customHooks/contactInfoActions";
import useContactInfoList from "../customHooks/contactInfoList";
import useChatUser from "../customHooks/chatUser";

const useStyles = makeStyles((theme) =>
  createStyles({
    avatarIcon: {
      height: "200px",
      width: "200px",
      margin: "auto",
    },
    icon: { color: "#8696A0" },
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
  const [openModal, setOpenModal] = useState(false);

  // Contexts
  const { toggleContactInfoDispatch } = useContexts();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Custom hooks
  const contactInfoActions = useContactInfoActions(
    props.setChat,
    props.block.length,
    handleOpenModal
  );
  const contactInfoList = useContactInfoList();
  const { chatUser } = useChatUser();

  return (
    <>
      <div className="sidebar-panel-right">
        <div className="sidebar-panel-right-header">
          <IconButton
            aria-label="close"
            className={classes.icon}
            onClick={() => {
              toggleContactInfoDispatch("hide");
            }}
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
          {contactInfoList.map((item) => {
            return (
              <div
                key={item.id}
                className={item.className}
                onClick={() => {
                  item.onClick();
                }}
              >
                <IconButton aria-label="star-messages" className={classes.icon}>
                  {item.icon}
                </IconButton>

                {item.title === "Disappearing messages" ? (
                  <div className="disappearing-messages-text">
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                ) : item.title === "Encryption" ? (
                  <div className="encryption-text">
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                ) : (
                  <h5>{item.title}</h5>
                )}

                {item.title === "Mute notifications" ? (
                  <ThemeSwitch />
                ) : (
                  item.title !== "Encryption" && (
                    <IconButton
                      aria-label="right-arrow"
                      className={classes.icon}
                    >
                      <Icons.KeyboardArrowRightRoundedIcon />
                    </IconButton>
                  )
                )}
              </div>
            );
          })}

          {contactInfoActions.map((item) => {
            return (
              <Tooltip
                title={item.name}
                enterDelay={1000}
                enterNextDelay={1000}
                key={item.id}
              >
                <div className={item.className} onClick={item.onClick}>
                  <IconButton aria-label={item.name}>{item.icon}</IconButton>
                  <div className="block-text">
                    <h5>
                      {item.id !== 3
                        ? `${item.name} ${chatUser.email}`
                        : item.name}
                    </h5>
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>

      <Report
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        setChat={props.setChat}
      />
    </>
  );
}

export default React.memo(ContactInfo);

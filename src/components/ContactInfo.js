import React, { useState } from "react";
// Styles
import "../styles/contact-info.css";
// Components
import Report from "./Report";
import * as Icons from "./Icons";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import Switch from "@mui/material/Switch";
// Custom hooks
import useContexts from "../customHooks/contexts";
import useContactInfoActions from "../customHooks/contactInfoActions";
import useContactInfoList from "../customHooks/contactInfoList";
import useChatUser from "../customHooks/chatUser";

///////////////////////////////////////////////////////////////////
function ContactInfo(props) {
  // UseState
  const [openModal, setOpenModal] = useState(false);

  // Keyborard shortcuts modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Custom hooks
  const { toggleContactInfoDispatch } = useContexts();

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
            onClick={() => {
              toggleContactInfoDispatch("hide");
            }}
          >
            <Icons.CloseRoundedIcon color="primary" />
          </IconButton>
          <h3>Contact info</h3>
        </div>

        <div className="contact-info-img">
          <Avatar
            src={chatUser.photoURL}
            style={{ height: "200px", width: "200px", margin: "auto" }}
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
            <IconButton aria-label="right-arrow">
              <Icons.KeyboardArrowRightRoundedIcon color="primary" />
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
                <IconButton aria-label="star-messages">{item.icon}</IconButton>

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
                  <Switch />
                ) : (
                  item.title !== "Encryption" && (
                    <IconButton aria-label="right-arrow">
                      <Icons.KeyboardArrowRightRoundedIcon color="primary" />
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

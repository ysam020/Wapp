import React, { useState } from "react";
// Styles
import "../styles/contact-info.css";
// Components
import Report from "./Report";
import * as Icons from "./Icons";
import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import Switch from "@mui/material/Switch";
// Custom hooks
import useContactInfoActions from "../customHooks/contactInfoActions";
import useContactInfoList from "../customHooks/contactInfoList";
import useContexts from "../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function ContactInfo(props) {
  // UseState
  const [openModal, setOpenModal] = useState(false);

  // Keyborard shortcuts modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Custom hooks
  const contactInfoActions = useContactInfoActions(
    handleOpenModal,
    props.block
  );

  const contactInfoList = useContactInfoList(props.toggleDrawer);
  const { chatDetailsContext } = useContexts();

  return (
    <>
      <div className="sidebar-panel-right">
        <div className="sidebar-panel-right-header">
          <IconButton
            aria-label="close"
            onClick={props.toggleDrawer("contactInfo", false)}
          >
            <Icons.CloseRoundedIcon color="primary" />
          </IconButton>
          <h3>Contact info</h3>
        </div>

        <div className="contact-info-body">
          <div className="contact-info-img">
            <Avatar
              src={chatDetailsContext.chatUser.photoURL}
              style={{ height: "200px", width: "200px", margin: "auto" }}
              alt={chatDetailsContext.chatUser.fullname}
            />
            <h3>{chatDetailsContext.chatUser.email}</h3>
          </div>

          <div className="contact-info-about">
            <h5>About</h5>
            <p>{chatDetailsContext.chatUser.about}</p>
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

          <div className="contact-info-list">
            {contactInfoList.map((item) => {
              return (
                <div
                  key={item.id}
                  className={item.className}
                  onClick={() => {
                    item.onClick();
                  }}
                >
                  <IconButton aria-label="star-messages">
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
                          ? `${item.name} ${chatDetailsContext.chatUser.email}`
                          : item.name}
                      </h5>
                    </div>
                  </div>
                </Tooltip>
              );
            })}
          </div>
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

import React from "react";
// Styles
import "../styles/encyption.css";
// Components
import ButtonPrimary from "./ButtonPrimary";
import * as Icons from "./Icons";
import { IconButton } from "@mui/material";
import cryptoRandomString from "crypto-random-string";
import QRCode from "react-qr-code";
// Custom hooks
import useContexts from "../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function Encryption(props) {
  // Custom hooks
  const { currentUser } = useContexts();

  let QR_Code = cryptoRandomString({ length: 60, type: "numeric" });
  let QR_CodeArray = QR_Code.match(/.{1,5}/g);

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          aria-label="close"
          onClick={props.toggleDrawer("encryption", false)}
        >
          <Icons.CloseRoundedIcon color="primary" />
        </IconButton>
        <div>
          <h3>Verify Security Code</h3>
          <p>You, {currentUser.fullname}</p>
        </div>
      </div>

      <div className="encryption-body">
        <div className="qr-img">
          <div className="qr-img-container">
            <QRCode value={currentUser.email} size={150} level="H" />
          </div>
        </div>

        <div className="encryption-code">
          {QR_CodeArray.map((code, id) => {
            return <span key={id}>{code}&nbsp;&nbsp;</span>;
          })}
        </div>

        <div className="encryption-info">
          <span>
            To verify that messages and calls with {currentUser.email} are
            end-to-end encrypted, scan or upload this code on their device. You
            can also compare the number above instead.
            <a href="/#" rel="noreferrer">
              Learn more
            </a>
          </span>
        </div>

        <ButtonPrimary>{"Scan code"}</ButtonPrimary>
        <ButtonPrimary>{"Upload code"}</ButtonPrimary>
      </div>
    </div>
  );
}

export default React.memo(Encryption);

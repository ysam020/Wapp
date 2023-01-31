import React, { useContext } from "react";
import "../styles/encyption.css";
import {
  UserContext,
  ToggleContactInfoContext,
  EncryptionContext,
} from "../contexts/Context";
import ButtonPrimary from "./ButtonPrimary";
import { IconButton } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import cryptoRandomString from "crypto-random-string";
import QRCode from "react-qr-code";

const useStyles = makeStyles(() =>
  createStyles({
    icon: { color: "#8696A0 !important" },
  })
);

function Encryption() {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const currentUser = useContext(UserContext);
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const encryptionContext = useContext(EncryptionContext);

  let QR_Code = cryptoRandomString({ length: 60, type: "numeric" });
  let QR_CodeArray = QR_Code.match(/.{1,5}/g);

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          aria-label="close"
          className={classes.icon}
          onClick={() => {
            toggleContactInfoContext.toggleContactInfoDispatch("toggle");
            encryptionContext.encryptionDispatch("toggle");
          }}
        >
          <CloseRoundedIcon />
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

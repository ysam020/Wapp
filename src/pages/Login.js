import React from "react";
// Styles
import "../styles/login.css";
// Components
import Button from "@mui/material/Button";
// Custom hooks
import useContexts from "../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function Login() {
  // Custom hooks
  const { signIn } = useContexts();

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png"
          alt=""
        />
        <h1>Wapp Web</h1>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
      <p className="disclaimer-text">
        Please note that this website is a clone of WhatsApp Web and is not the
        official WhatsApp website. If you were looking for the original site,
        please visit <a href="https://web.whatsapp.com/">Whatsapp Web</a>. This
        clone has been developed as a personal project to showcase my skills in
        ReactJS and Firebase technologies. It is not affiliated with or endorsed
        by WhatsApp Inc. I would like to clarify that this clone is for
        educational and personal development purposes only. It does not involve
        any malicious activities or intentions.
        <br />
        Thank you for your understanding.
      </p>
    </div>
  );
}

export default React.memo(Login);

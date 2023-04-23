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
    </div>
  );
}

export default React.memo(Login);

import React, { useContext } from "react";
import Button from "@mui/material/Button";
import "../styles/login.css";
import { LoginContext } from "../contexts/Context";

function Login({ setUser }) {
  const signIn = useContext(LoginContext);

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

export default Login;

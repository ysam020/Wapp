import { useState } from "react";
import firebase from "firebase/app";
import { useNavigate } from "react-router-dom";
// utils
import db, { auth, provider } from "../firebase";

///////////////////////////////////////////////////////////////////
function useSignIn() {
  const navigate = useNavigate();

  // useState
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // Parse user from local storage, if present

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          timestamp: firebase.firestore.Timestamp.now(),
          about: "Hey there, I'm using Wapp",
        };

        // Set User
        setUser(newUser);

        // Add user to local storage
        localStorage.setItem("user", JSON.stringify(newUser));

        // Add user to users collection in database
        db.collection("users").doc(result.user.email).set(newUser);

        // Navigate to home after sign in
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  return { signIn, user, setUser };
}

export default useSignIn;

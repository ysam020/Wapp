import React from "react";
import useContexts from "./contexts";
import firebase from "firebase/app";
import db from "../firebase";

function useFriendData() {
  // useState
  const [emailId, setEmailId] = React.useState(
    JSON.parse(localStorage.getItem("chat"))
  );
  const [chat, setChat] = React.useState(emailId ? true : false);
  const [block, setBlock] = React.useState([]);
  const [starredMessages, setStarredMessages] = React.useState([]);
  const usersCollectionRef = db.collection("users");

  // Context
  const { currentUser } = useContexts();

  // Update last online in user collection
  React.useEffect(() => {
    if (currentUser) {
      usersCollectionRef
        .doc(currentUser.email)
        .update({ lastOnline: firebase.firestore.Timestamp.now() });
    }
    // eslint-disable-next-line
  }, [currentUser.email]);

  return {
    emailId,
    setEmailId,
    chat,
    setChat,
    block,
    setBlock,
    starredMessages,
    setStarredMessages,
  };
}

export default useFriendData;

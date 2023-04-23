import { useEffect, useState } from "react";
import firebase from "firebase/app";
// utils
import db from "../firebase";
// Custom hooks
import useContexts from "./contexts";
import useGetMessages from "../customHooks/getMessages";

///////////////////////////////////////////////////////////////////
function useFriendData() {
  // useState
  const [emailId, setEmailId] = useState(
    JSON.parse(localStorage.getItem("chat"))
  );
  const [chat, setChat] = useState(emailId ? true : false);
  const [block, setBlock] = useState([]);
  const [starredMessages, setStarredMessages] = useState([]);
  const { chatMessages } = useGetMessages();

  // db Ref
  const usersCollectionRef = db.collection("users");

  // Custom hooks
  const { currentUser } = useContexts();

  // Update last online in user collection
  useEffect(() => {
    if (chatMessages.length > 0 && emailId) {
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

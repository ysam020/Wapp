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
  const [chatUser, setChatUser] = useState(
    JSON.parse(localStorage.getItem("chat"))
  );

  const [chat, setChat] = useState(chatUser?.email ? true : false);

  const { chatMessages } = useGetMessages();

  // db Ref
  const usersCollectionRef = db.collection("users");

  // Custom hooks
  const { currentUser } = useContexts();

  // Update last online in user collection
  useEffect(() => {
    if (chatMessages.length > 0 && chatUser?.email) {
      usersCollectionRef
        .doc(currentUser.email)
        .update({ lastOnline: firebase.firestore.Timestamp.now() });
    }

    // eslint-disable-next-line
  }, []);

  return {
    chatUser,
    setChatUser,
    chat,
    setChat,
  };
}

export default useFriendData;

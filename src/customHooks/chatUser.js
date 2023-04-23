import { useState, useEffect } from "react";
// utils
import { getUser } from "../utils/getUser";
import FirebaseRefs from "../components/FirebaseRefs";
// Custom hooks
import { checkBlockedUser } from "../utils/checkBlockedUser";
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useChatUser(setBlock = null, chatMessages) {
  // useState
  const [chatUser, setChatUser] = useState({});
  const [lastSeen, setLastSeen] = useState();

  // Custom hooks
  const { emailId, currentUser } = useContexts();

  // Firebase refs
  const firebaseRef = emailId ? FirebaseRefs(emailId, currentUser) : "";

  useEffect(() => {
    if (emailId) {
      getUser(emailId, currentUser, setChatUser);
      if (setBlock && typeof setBlock === "function") {
        checkBlockedUser(emailId, currentUser, setBlock, chatUser);
      }

      // Get last online time
      firebaseRef.chatUserRef.onSnapshot((snapshot) =>
        setLastSeen(snapshot.data().lastOnline)
      );
    }

    // eslint-disable-next-line
  }, [
    chatMessages,
    chatUser.email,
    emailId,
    setBlock,

    // setChatUser,
  ]);

  return { chatUser, setChatUser, lastSeen, setLastSeen };
}

export default useChatUser;

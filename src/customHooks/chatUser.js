import React from "react";
import useContexts from "./contexts";
import { getUser } from "../utils/getUser";
import { checkBlockedUser } from "../utils/checkBlockedUser";
import FirebaseRefs from "../components/FirebaseRefs";

function useChatUser(setBlock = null, chatMessages) {
  const [chatUser, setChatUser] = React.useState({});
  const [lastSeen, setLastSeen] = React.useState();
  const { emailId, currentUser } = useContexts();

  // Firebase refs
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  React.useEffect(() => {
    getUser(emailId, currentUser, setChatUser);
    if (setBlock && typeof setBlock === "function") {
      checkBlockedUser(emailId, currentUser, setBlock, chatUser);
    }

    // Get last online time
    firebaseRef.chatUserRef.onSnapshot((snapshot) =>
      setLastSeen(snapshot.data().lastOnline)
    );

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

import { useState, useEffect } from "react";
// utils
import { handleTyping } from "../utils/typing";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useHandleTyping() {
  // useState
  const [typing, setTyping] = useState(false);
  // Custom hooks
  const { currentUser, chatDetailsContext } = useContexts();

  useEffect(() => {
    if (chatDetailsContext.chatMessages.length > 0) {
      handleTyping(typing, chatDetailsContext.chatUser.email, currentUser);
    }
    // eslint-disable-next-line
  }, [typing]);

  return { typing, setTyping };
}

export default useHandleTyping;

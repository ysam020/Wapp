import { useState, useEffect } from "react";
// utils
import { handleTyping } from "../utils/typing";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useHandleTyping(chatMessages) {
  // useState
  const [typing, setTyping] = useState(false);

  // Custom hooks
  const { currentUser, emailId } = useContexts();

  useEffect(() => {
    if (chatMessages.length > 0) {
      handleTyping(typing, emailId, currentUser);
    }
    // eslint-disable-next-line
  }, [typing]);

  return { typing, setTyping };
}

export default useHandleTyping;

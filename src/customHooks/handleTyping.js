import { useState, useEffect } from "react";
// utils
import { handleTyping } from "../utils/typing";
// Custom hooks
import useContexts from "./contexts";
import useGetMessages from "./getMessages";

///////////////////////////////////////////////////////////////////
function useHandleTyping() {
  // useState
  const [typing, setTyping] = useState(false);

  // Custom hooks
  const { currentUser, emailId } = useContexts();
  const { chatMessages } = useGetMessages();

  useEffect(() => {
    if (chatMessages.length > 0) {
      handleTyping(typing, emailId, currentUser);
    }
    // eslint-disable-next-line
  }, [typing]);

  return { typing, setTyping };
}

export default useHandleTyping;

import { useState, useEffect } from "react";
// utils
import { handleTypingIndicator } from "../utils/typing";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useHandleTypingIndicator(chatMessages) {
  // useState
  const [typingIndicator, setTypingIndicator] = useState();

  // Custom hooks
  const { currentUser, emailId } = useContexts();

  useEffect(() => {
    handleTypingIndicator(
      setTypingIndicator,
      emailId,
      currentUser,
      chatMessages
    );
    // eslint-disable-next-line
  }, [typingIndicator]);

  return { typingIndicator };
}

export default useHandleTypingIndicator;

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
  const { currentUser, chatDetailsContext } = useContexts();

  useEffect(() => {
    handleTypingIndicator(
      setTypingIndicator,
      chatDetailsContext.chatUser.email,
      currentUser
    );
    // eslint-disable-next-line
  }, [typingIndicator]);

  return { typingIndicator };
}

export default useHandleTypingIndicator;

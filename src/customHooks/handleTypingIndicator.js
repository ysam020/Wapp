import { useState, useEffect } from "react";
import { handleTypingIndicator } from "../utils/typing";
import useContexts from "./contexts";

function useHandleTypingIndicator() {
  const [typingIndicator, setTypingIndicator] = useState();
  const { currentUser, emailId } = useContexts();

  useEffect(() => {
    handleTypingIndicator(setTypingIndicator, emailId, currentUser);
    // eslint-disable-next-line
  }, [typingIndicator]);

  return { typingIndicator };
}

export default useHandleTypingIndicator;

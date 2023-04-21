import React from "react";
import { handleTyping } from "../utils/typing";
import useContexts from "./contexts";

function useHandleTyping(chatMessages) {
  const [typing, setTyping] = React.useState(false);

  const { currentUser, emailId } = useContexts();

  React.useEffect(() => {
    if (chatMessages.length > 0) {
      handleTyping(typing, emailId, currentUser);
    }
    // eslint-disable-next-line
  }, [typing]);

  return { typing, setTyping };
}

export default useHandleTyping;

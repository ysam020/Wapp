import { useEffect, useState } from "react";
// utils
import { getMessages } from "../utils/getMessages";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useGetMessages(setStarredMessages = null) {
  // useState
  const [chatMessages, setChatMessages] = useState([]);

  // Custom hooks
  const { currentUser, emailId } = useContexts();

  useEffect(() => {
    if (typeof setStarredMessages === "function") {
      getMessages(currentUser, emailId, setStarredMessages, setChatMessages);
    }
    // eslint-disable-next-line
  }, [emailId]);

  return { chatMessages, setChatMessages };
}

export default useGetMessages;

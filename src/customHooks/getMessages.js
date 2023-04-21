import React from "react";
import { getMessages } from "../utils/getMessages";
import useContexts from "./contexts";

function useGetMessages(setStarredMessages) {
  const [chatMessages, setChatMessages] = React.useState([]);
  const { currentUser, emailId } = useContexts();

  React.useEffect(() => {
    getMessages(currentUser, emailId, setStarredMessages, setChatMessages);
    // eslint-disable-next-line
  }, [emailId]);

  return { chatMessages, setChatMessages };
}

export default useGetMessages;

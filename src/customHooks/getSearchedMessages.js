import { useState, useEffect, useRef, useCallback } from "react";
import useContexts from "./contexts";
import FirebaseRefs from "../components/FirebaseRefs";

function useGetSearchedMessages() {
  const [searchedMessage, setSearchedMessage] = useState([]);
  const [searchedMessageInput, setSearchedMessageInput] = useState("");
  const searchMessagesRef = useRef();
  const { currentUser, emailId } = useContexts();
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  // Get chats from database
  const getMessages = useCallback(() => {
    firebaseRef.senderMessageCollectionRef
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());

        let newMessage = messages.filter(
          (message) =>
            message.senderEmail === (currentUser.email && emailId) ||
            message.receiverEmail === (currentUser.email && emailId)
        );

        setSearchedMessage(
          newMessage.filter((searchTerm) => {
            if (searchedMessageInput) {
              if (searchTerm.text.includes(searchedMessageInput)) {
                return searchTerm;
              }
            }
            return false;
          })
        );
      });
    // eslint-disable-next-line
  }, [searchedMessageInput]);

  useEffect(() => {
    searchMessagesRef.current.focus();
    getMessages();

    // eslint-disable-next-line
  }, [searchedMessageInput, emailId]);

  return {
    searchedMessage,
    setSearchedMessage,
    searchedMessageInput,
    setSearchedMessageInput,
    searchMessagesRef,
  };
}

export default useGetSearchedMessages;

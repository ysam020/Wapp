import { useState, useEffect, useRef } from "react";
// utils
import FirebaseRefs from "../components/FirebaseRefs";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useGetSearchedMessages() {
  // useState
  const [searchedMessage, setSearchedMessage] = useState([]);
  const [searchedMessageInput, setSearchedMessageInput] = useState("");

  // useRef
  const searchMessagesRef = useRef();

  // Custom hooks
  const { currentUser, chatDetailsContext } = useContexts();

  // db ref
  const firebaseRef = chatDetailsContext.chatUser.email
    ? FirebaseRefs(chatDetailsContext.chatUser.email, currentUser)
    : "";

  // Get chats from database
  useEffect(() => {
    searchMessagesRef.current.focus();
    if (chatDetailsContext.chatUser.email) {
      firebaseRef.senderMessageCollectionRef
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());

          let newMessage = messages.filter(
            (message) =>
              message.senderEmail ===
                (currentUser.email && chatDetailsContext.chatUser.email) ||
              message.receiverEmail ===
                (currentUser.email && chatDetailsContext.chatUser.email)
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
    }

    // eslint-disable-next-line
  }, [searchedMessageInput, chatDetailsContext.chatUser.email]);

  return {
    searchedMessage,
    setSearchedMessage,
    searchedMessageInput,
    setSearchedMessageInput,
    searchMessagesRef,
  };
}

export default useGetSearchedMessages;

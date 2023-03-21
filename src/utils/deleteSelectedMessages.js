import FirebaseRefs from "../components/FirebaseRefs";

export const deleteSelectedMessages = (
  selectedMessages,
  chatMessages,
  setSelectMessagesUI,
  setSelectedMessages,
  emailId,
  currentUser
) => {
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  selectedMessages.map((message) => {
    firebaseRef.senderMessageCollectionRef
      .where("messageId", "==", message)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          firebaseRef.senderMessageCollectionRef
            .doc(doc.id)
            .delete()
            .then(() => {
              // Update last message in sidebar
              if (selectedMessages.length !== chatMessages.length) {
                firebaseRef.senderFriendListRef.update({
                  lastMessage: chatMessages.at(-2).text,
                  messageRead: chatMessages.at(-2).read,
                  messageType: chatMessages.at(-2).messageInfo,
                  timestamp: chatMessages.at(-2).timestamp,
                });
              } else {
                firebaseRef.senderFriendListRef.update({
                  lastMessage: "",
                  messageRead: "",
                  messageType: "",
                  timestamp: null,
                });
              }
            })
        )
      );

    firebaseRef.receiverMessageCollectionRef
      .where("messageId", "==", message)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          firebaseRef.receiverMessageCollectionRef.doc(doc.id).delete()
        )
      );

    setSelectMessagesUI(false);
    setSelectedMessages([]);
    return "";
  });
};

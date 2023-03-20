export const deleteSelectedMessages = (
  selectedMessages,
  senderMessageCollectionRef,
  chatMessages,
  senderFriendListRef,
  receiverMessageCollectionRef,
  setSelectMessagesUI,
  setSelectedMessages
) => {
  selectedMessages.map((message) => {
    senderMessageCollectionRef
      .where("messageId", "==", message)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          senderMessageCollectionRef
            .doc(doc.id)
            .delete()
            .then(() => {
              // Update last message in sidebar
              if (selectedMessages.length !== chatMessages.length) {
                senderFriendListRef.update({
                  lastMessage: chatMessages.at(-2).text,
                  messageRead: chatMessages.at(-2).read,
                  messageType: chatMessages.at(-2).messageInfo,
                  timestamp: chatMessages.at(-2).timestamp,
                });
              } else {
                senderFriendListRef.update({
                  lastMessage: "",
                  messageRead: "",
                  messageType: "",
                  timestamp: null,
                });
              }
            })
        )
      );

    receiverMessageCollectionRef
      .where("messageId", "==", message)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          receiverMessageCollectionRef.doc(doc.id).delete()
        )
      );

    setSelectMessagesUI(false);
    setSelectedMessages([]);
    return "";
  });
};

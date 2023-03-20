export const getMessages = (
  senderMessageCollectionRef,
  currentUser,
  emailId,
  setStarredMessages,
  setChatMessages
) => {
  senderMessageCollectionRef
    .orderBy("timestamp", "asc")
    .onSnapshot((snapshot) => {
      let messages = snapshot.docs.map((doc) => doc.data());

      let newMessage = messages.filter(
        (message) =>
          message.senderEmail === (currentUser.email && emailId) ||
          message.receiverEmail === (currentUser.email && emailId)
      );

      // Get starred messages
      senderMessageCollectionRef
        .where("starred", "==", true)
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setStarredMessages(snapshot.docs);
        });

      setChatMessages(newMessage);
    });
};

// utils
import FirebaseRefs from "../components/FirebaseRefs";

export const getMessages = (
  currentUser,
  emailId,
  setStarredMessages = null,
  setChatMessages
) => {
  // db Ref
  const firebaseRef = FirebaseRefs(emailId, currentUser);
  firebaseRef.senderMessageCollectionRef
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      let messages = snapshot.docs.map((doc) => doc.data());

      let newMessage = messages.filter(
        (message) =>
          message.senderEmail === (currentUser.email && emailId) ||
          message.receiverEmail === (currentUser.email && emailId)
      );

      // Get starred messages
      if (typeof setStarredMessages === "function") {
        firebaseRef.senderMessageCollectionRef
          .where("starred", "==", true)
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            setStarredMessages(snapshot.docs);
          });
      }

      setChatMessages(newMessage);
    });
};

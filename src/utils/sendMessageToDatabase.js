import firebase from "firebase/app";

export const sendMessageToDatabase = (
  payload,
  senderMessageCollectionRef,
  receiverMessageCollectionRef,
  senderFriendListRef,
  receiverFriendListRef,
  chatUser,
  message,
  currentUser,
  chatMessages,
  emailId
) => {
  //Add message to chat collection for sender
  senderMessageCollectionRef.add(payload);

  //Add message to chat collection for receiver
  receiverMessageCollectionRef.add(payload);

  // Add friend in FriendList collection for sender
  senderFriendListRef.set({
    email: chatUser.email,
    fullname: chatUser.fullname,
    photoURL: chatUser.photoURL,
    lastMessage: message,
    messageType: payload.messageInfo,
    messageSent: true,
    messageRead: false,
    timestamp: firebase.firestore.Timestamp.now(),
  });

  // Add friend in FriendList collection for receiver
  receiverFriendListRef.set({
    email: currentUser.email,
    fullname: currentUser.fullname,
    photoURL: currentUser.photoURL,
    lastMessage: message,
    messageType: payload.messageInfo,
    timestamp: firebase.firestore.Timestamp.now(),
  });

  // Mark messages as read when user replies
  if (chatMessages.length !== 0) {
    receiverMessageCollectionRef
      .where(
        "senderEmail",
        "==",
        emailId,
        "&&",
        "receiverEmail",
        "==",
        currentUser.email
      )
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            read: true,
          });
        });
      });
  }

  receiverFriendListRef.update({ messageRead: true });
};

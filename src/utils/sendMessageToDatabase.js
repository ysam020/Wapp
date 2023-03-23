import firebase from "firebase/app";
import FirebaseRefs from "../components/FirebaseRefs";

export const sendMessageToDatabase = (
  payload,
  chatUser,
  message,
  currentUser,
  chatMessages,
  emailId
) => {
  const firebaseRef = FirebaseRefs(emailId, currentUser);
  //Add message to chat collection for sender
  firebaseRef.senderMessageCollectionRef.add(payload);

  //Add message to chat collection for receiver
  firebaseRef.receiverMessageCollectionRef.add(payload);

  // Add friend in FriendList collection for sender
  firebaseRef.senderFriendListRef.set({
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
  firebaseRef.receiverFriendListRef.set({
    email: currentUser.email,
    fullname: currentUser.fullname,
    photoURL: currentUser.photoURL,
    lastMessage: message,
    messageType: payload.messageInfo,
    timestamp: firebase.firestore.Timestamp.now(),
  });

  // Mark messages as read when user replies
  if (chatMessages.length !== 0) {
    firebaseRef.receiverMessageCollectionRef
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

  firebaseRef.receiverFriendListRef.update({ messageRead: true });
};

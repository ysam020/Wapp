import db from "../firebase";

const FirebaseRefs = (emailId, currentUser) => {
  const firebaseRef = {
    chatUserRef: db.collection("users").doc(emailId),

    senderMessageCollectionRef: db
      .collection("chats")
      .doc(currentUser.email)
      .collection("messages"),

    receiverMessageCollectionRef: db
      .collection("chats")
      .doc(emailId)
      .collection("messages"),

    blockedUserCollectionRef: db
      .collection("blockedUser")
      .doc(currentUser.email)
      .collection("list"),

    senderFriendListRef: db
      .collection("FriendList")
      .doc(currentUser.email)
      .collection("list")
      .doc(emailId),

    receiverFriendListRef: db
      .collection("FriendList")
      .doc(emailId)
      .collection("list")
      .doc(currentUser.email),
  };

  return firebaseRef;
};

export default FirebaseRefs;

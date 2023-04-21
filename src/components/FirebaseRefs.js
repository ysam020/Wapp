import db from "../firebase";

const FirebaseRefs = (emailId, currentUser) => {
  const firebaseRef = {
    usersCollectionRef: db.collection("users"),

    userRef: db.collection("users").doc(currentUser.email),

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

    senderFriendListCollectionRef: db
      .collection("FriendList")
      .doc(currentUser.email)
      .collection("list"),
  };

  return firebaseRef;
};

export default FirebaseRefs;

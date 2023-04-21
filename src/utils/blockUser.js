import db from "../firebase";

export const blockUser = (currentUser, chatUser) => {
  var blockedUserCollectionRef = db
    .collection("blockedUser")
    .doc(currentUser.email)
    .collection("list");

  blockedUserCollectionRef.doc(chatUser.email).set({
    email: chatUser.email,
  });
};

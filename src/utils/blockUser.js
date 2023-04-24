// utils
import db from "../firebase";

export const blockUser = (currentUser, emailId) => {
  // db Ref
  var blockedUserCollectionRef = db
    .collection("blockedUser")
    .doc(currentUser.email)
    .collection("list");

  blockedUserCollectionRef.doc(emailId).set({
    email: emailId,
  });
};

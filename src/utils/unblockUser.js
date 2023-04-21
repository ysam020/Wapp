import db from "../firebase";

export const unblockUser = (currentUser, emailId) => {
  var blockedUserCollectionRef = db
    .collection("blockedUser")
    .doc(currentUser.email)
    .collection("list");

  blockedUserCollectionRef.doc(emailId).delete();
};

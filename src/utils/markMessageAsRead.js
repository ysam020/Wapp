import FirebaseRefs from "../components/FirebaseRefs";

export function markMessageAsread(emailId, currentUser) {
  const firebaseRef = FirebaseRefs(emailId, currentUser);

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

  firebaseRef.receiverFriendListRef.update({ messageRead: true });
}

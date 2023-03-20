export function markMessageAsread(
  receiverMessageCollectionRef,
  emailId,
  currentUser
) {
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

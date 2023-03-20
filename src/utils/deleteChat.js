export const deleteChat = (
  emailId,
  currentUser,
  senderMessageCollectionRef,
  receiverMessageCollectionRef,
  senderFriendListRef,
  receiverFriendListRef,
  setChat
) => {
  senderMessageCollectionRef
    .where("receiverEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        senderMessageCollectionRef.doc(doc.id).delete()
      )
    );

  senderMessageCollectionRef
    .where("senderEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        senderMessageCollectionRef.doc(doc.id).delete()
      )
    );

  receiverMessageCollectionRef
    .where("receiverEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        receiverMessageCollectionRef.doc(doc.id).delete()
      )
    );

  receiverMessageCollectionRef
    .where("senderEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        receiverMessageCollectionRef.doc(doc.id).delete()
      )
    );

  // Delete from friend list
  senderFriendListRef.delete();

  receiverFriendListRef.delete();

  setChat(false);

  localStorage.removeItem("chat");
};

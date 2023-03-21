import FirebaseRefs from "../components/FirebaseRefs";

export const deleteChat = (emailId, currentUser, setChat) => {
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  firebaseRef.senderMessageCollectionRef
    .where("receiverEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        firebaseRef.senderMessageCollectionRef.doc(doc.id).delete()
      )
    );

  firebaseRef.senderMessageCollectionRef
    .where("senderEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        firebaseRef.senderMessageCollectionRef.doc(doc.id).delete()
      )
    );

  firebaseRef.receiverMessageCollectionRef
    .where("receiverEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        firebaseRef.receiverMessageCollectionRef.doc(doc.id).delete()
      )
    );

  firebaseRef.receiverMessageCollectionRef
    .where("senderEmail", "==", emailId, "||", currentUser.email)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        firebaseRef.receiverMessageCollectionRef.doc(doc.id).delete()
      )
    );

  // Delete from friend list
  firebaseRef.senderFriendListRef.delete();

  firebaseRef.receiverFriendListRef.delete();

  setChat(false);

  localStorage.removeItem("chat");
};

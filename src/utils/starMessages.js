// utils
import FirebaseRefs from "../components/FirebaseRefs";

export const starMessages = (selectedMessages, emailId, currentUser) => {
  // db Ref
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  selectedMessages.map((message) => {
    firebaseRef.senderMessageCollectionRef
      .where("messageId", "==", message)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          firebaseRef.senderMessageCollectionRef
            .doc(doc.id)
            .update({ starred: true })
        )
      );

    return "";
  });
};

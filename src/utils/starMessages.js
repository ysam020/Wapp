export const starMessages = (selectedMessages, senderMessageCollectionRef) => {
  selectedMessages.map((message) => {
    senderMessageCollectionRef
      .where("messageId", "==", message)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          senderMessageCollectionRef.doc(doc.id).update({ starred: true })
        )
      );

    return "";
  });
};

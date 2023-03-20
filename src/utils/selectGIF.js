import cryptoRandomString from "crypto-random-string";

export const selectGif = (
  currentUser,
  props,
  firebase,
  sendMessageToDatabase,
  senderMessageCollectionRef,
  receiverMessageCollectionRef,
  senderFriendListRef,
  receiverFriendListRef,
  result
) => {
  let randomString = cryptoRandomString({ length: 10 });

  let payload = {
    text: "Gif",
    messageId: randomString,
    messageInfo: "Gif",
    senderEmail: currentUser.email,
    receiverEmail: props.emailId,
    timestamp: firebase.firestore.Timestamp.now(),
    read: false,
    imageURL: result.media[0].gif.url,
  };

  sendMessageToDatabase(
    payload,
    senderMessageCollectionRef,
    receiverMessageCollectionRef,
    senderFriendListRef,
    receiverFriendListRef,
    props.chatUser,
    props.message,
    currentUser,
    props.chatMessages,
    props.emailId
  );
};

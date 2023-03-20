import cryptoRandomString from "crypto-random-string";

export const clickImage = (
  webcamRef,
  storage,
  currentUser,
  props,
  firebase,
  sendMessageToDatabase,
  senderMessageCollectionRef,
  receiverMessageCollectionRef,
  senderFriendListRef,
  receiverFriendListRef,
  setShowWebcam,
  setCircularProgress
) => {
  const clickedImage = webcamRef.current.getScreenshot();
  let randomString = cryptoRandomString({ length: 10 });

  const uploadTask = storage
    .ref(`files/Img${randomString}`)
    .putString(clickedImage, "data_url", { contentType: "image/jpg" });

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => console.log(error),
    () => {
      storage
        .ref("files")
        .child(`Img${randomString}`)
        .getDownloadURL()
        .then((url) => {
          let payload = {
            text: "Photo",
            fileName: `Img${randomString}`,
            extension: "jpg",
            messageId: randomString,
            messageInfo: "Photo",
            senderEmail: currentUser.email,
            receiverEmail: props.emailId,
            timestamp: firebase.firestore.Timestamp.now(),
            read: false,
            imageURL: url,
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
        });
    }
  );

  setShowWebcam(false);
  setCircularProgress(true);
};

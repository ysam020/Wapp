import cryptoRandomString from "crypto-random-string";

export const selectFiles = (
  e,
  storage,
  currentUser,
  props,
  firebase,
  sendMessageToDatabase,
  senderMessageCollectionRef,
  receiverMessageCollectionRef,
  senderFriendListRef,
  receiverFriendListRef,
  setSendMediaList,
  sendMediaList
) => {
  const file = e.target.files[0];
  console.log(file);
  let randomString = cryptoRandomString({ length: 10 });

  const uploadTask = storage.ref(`files/${file.name}`).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => console.log(error),
    () => {
      storage
        .ref("files")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          // If images
          if (e.target.getAttribute("accept") === "image/*") {
            let payload = {
              text: "Photo",
              fileName: file.name,
              extension: file.name.split(".").at(-1),
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
          }
          // If videos
          else if (
            e.target.getAttribute("accept") ===
            "video/mp4,video/3gpp,video/quicktime"
          ) {
            let payload = {
              text: "Video",
              fileName: file.name,
              extension: file.name.split(".").at(-1),
              messageId: randomString,
              messageInfo: "Video",
              senderEmail: currentUser.email,
              receiverEmail: props.emailId,
              timestamp: firebase.firestore.Timestamp.now(),
              read: false,
              videoURL: url,
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
          }
          // If documents
          else if (e.target.getAttribute("accept") === "*") {
            let payload = {
              text: "Document",
              fileName: file.name,
              extension: file.name.split(".").at(-1),
              messageId: randomString,
              messageInfo: "Document",
              senderEmail: currentUser.email,
              receiverEmail: props.emailId,
              timestamp: firebase.firestore.Timestamp.now(),
              read: false,
              fileURL: url,
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
          }
        });
    }
  );

  setSendMediaList(!sendMediaList);
};

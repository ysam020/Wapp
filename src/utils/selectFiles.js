import cryptoRandomString from "crypto-random-string";
import firebase from "firebase/app";
// utils
import { sendMessageToDatabase } from "./sendMessageToDatabase";

export const selectFiles = (
  e,
  currentUser,
  emailId,
  chatUser,
  message,
  chatMessages,
  setSendMediaList,
  sendMediaList
) => {
  const file = e.target.files[0];
  console.log(file.size);
  if (file.size > 1048487) {
    alert("File sizes upto 1MB are allowed");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const base64 = event.target.result;

    let randomString = cryptoRandomString({ length: 10 });

    // If images
    if (e.target.getAttribute("accept") === "image/*") {
      let payload = {
        text: "Photo",
        fileName: file.name,
        extension: file.name.split(".").at(-1),
        messageId: randomString,
        messageInfo: "Photo",
        senderEmail: currentUser.email,
        receiverEmail: emailId,
        timestamp: firebase.firestore.Timestamp.now(),
        read: false,
        imageURL: base64,
      };

      sendMessageToDatabase(
        payload,
        chatUser,
        message,
        currentUser,
        chatMessages,
        emailId
      );
    }
    // If videos
    else if (
      e.target.getAttribute("accept") === "video/mp4,video/3gpp,video/quicktime"
    ) {
      let payload = {
        text: "Video",
        fileName: file.name,
        extension: file.name.split(".").at(-1),
        messageId: randomString,
        messageInfo: "Video",
        senderEmail: currentUser.email,
        receiverEmail: emailId,
        timestamp: firebase.firestore.Timestamp.now(),
        read: false,
        videoURL: base64,
      };
      console.log(payload);

      sendMessageToDatabase(
        payload,
        chatUser,
        message,
        currentUser,
        chatMessages,
        emailId
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
        receiverEmail: emailId,
        timestamp: firebase.firestore.Timestamp.now(),
        read: false,
        fileURL: base64,
      };

      sendMessageToDatabase(
        payload,
        chatUser,
        message,
        currentUser,
        chatMessages,
        emailId
      );
    }
  };

  reader.readAsDataURL(file);
  setSendMediaList(!sendMediaList);
};

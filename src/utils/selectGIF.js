import cryptoRandomString from "crypto-random-string";
import { sendMessageToDatabase } from "./sendMessageToDatabase";
import firebase from "firebase/app";

export const selectGif = (
  currentUser,
  emailId,
  message,
  chatMessages,
  chatUser,
  result
) => {
  let randomString = cryptoRandomString({ length: 10 });

  let payload = {
    text: "Gif",
    messageId: randomString,
    messageInfo: "Gif",
    senderEmail: currentUser.email,
    receiverEmail: emailId,
    timestamp: firebase.firestore.Timestamp.now(),
    read: false,
    imageURL: result.media[0].gif.url,
  };

  sendMessageToDatabase(
    payload,
    chatUser,
    message,
    currentUser,
    chatMessages,
    emailId
  );
};

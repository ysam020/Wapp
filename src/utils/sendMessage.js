import { sendMessageToDatabase } from "./sendMessageToDatabase";
import cryptoRandomString from "crypto-random-string";
import firebase from "firebase/app";

// Send Message
export function sendMessage(
  block,
  message,
  emailId,
  currentUser,
  chatUser,
  chatMessages,
  setMessage
) {
  //   e.preventDefault();
  let randomString = cryptoRandomString({ length: 10 });

  if (block.length === 0 && message.length !== 0 && emailId) {
    let payload = {
      text: message,
      messageId: randomString,
      messageInfo: "string",
      senderEmail: currentUser.email,
      receiverEmail: emailId,
      timestamp: firebase.firestore.Timestamp.now(),
      read: false,
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

  setMessage("");
}

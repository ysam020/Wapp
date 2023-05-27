import cryptoRandomString from "crypto-random-string";
import firebase from "firebase/app";
// utils
import { sendMessageToDatabase } from "./sendMessageToDatabase";

export const clickImage = (
  webcamRef,
  currentUser,
  emailId,
  chatUser,
  message,
  chatMessages,
  setShowWebcam,
  setCircularProgress
) => {
  const clickedImage = webcamRef.current.getScreenshot();
  let randomString = cryptoRandomString({ length: 10 });

  let payload = {
    text: "Photo",
    fileName: `Img${randomString}`,
    extension: "jpg",
    messageId: randomString,
    messageInfo: "Photo",
    senderEmail: currentUser.email,
    receiverEmail: emailId,
    timestamp: firebase.firestore.Timestamp.now(),
    read: false,
    imageURL: clickedImage,
  };

  sendMessageToDatabase(
    payload,
    chatUser,
    message,
    currentUser,
    chatMessages,
    emailId
  );

  setShowWebcam(false);
  setCircularProgress(true);
};

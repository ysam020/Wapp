import cryptoRandomString from "crypto-random-string";
import firebase from "firebase/app";
import { sendMessageToDatabase } from "./sendMessageToDatabase";

export const clickImage = (
  webcamRef,
  storage,
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
            receiverEmail: emailId,
            timestamp: firebase.firestore.Timestamp.now(),
            read: false,
            imageURL: url,
          };

          sendMessageToDatabase(
            payload,
            chatUser,
            message,
            currentUser,
            chatMessages,
            emailId
          );
        });
    }
  );

  setShowWebcam(false);
  setCircularProgress(true);
};

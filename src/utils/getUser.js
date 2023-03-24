import FirebaseRefs from "../components/FirebaseRefs";

export function getUser(emailId, currentUser, setChatUser) {
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  firebaseRef.chatUserRef.onSnapshot((snapshot) =>
    setChatUser(snapshot.data())
  );
}

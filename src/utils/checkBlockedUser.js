// utils
import FirebaseRefs from "../components/FirebaseRefs";

export function checkBlockedUser(emailId, currentUser, setBlock) {
  // db Ref
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  firebaseRef.blockedUserCollectionRef.onSnapshot((snapshot) => {
    setBlock(snapshot.docs.filter((doc) => doc.data().email === emailId));
  });
}

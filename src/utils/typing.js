import FirebaseRefs from "../components/FirebaseRefs";

// Update typing to database
export const handleTyping = (typing, emailId, currentUser) => {
  const firebaseRef = FirebaseRefs(emailId, currentUser);
  if (typing === true) {
    firebaseRef.receiverFriendListRef.update({ typing: true });
  } else {
    firebaseRef.receiverFriendListRef.update({ typing: false });
  }
};

// Get typing indicator from database
export const handleTypingIndicator = (
  setTypingIndicator,
  emailId,
  currentUser
) => {
  const firebaseRef = FirebaseRefs(emailId, currentUser);

  firebaseRef.senderFriendListRef.onSnapshot((snapshot) => {
    setTypingIndicator(snapshot.data().typing);
  });
  // eslint-disable-next-line
};

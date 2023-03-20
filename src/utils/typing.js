// Update typing to database
export const handleTyping = (typing, receiverFriendListRef) => {
  if (typing === true) {
    receiverFriendListRef.update({ typing: true });
  } else {
    receiverFriendListRef.update({ typing: false });
  }
};

// Get typing indicator from database
export const handleTypingIndicator = (
  senderFriendListRef,
  setTypingIndicator
) => {
  senderFriendListRef.onSnapshot((snapshot) => {
    setTypingIndicator(snapshot.data().typing);
  });
  // eslint-disable-next-line
};

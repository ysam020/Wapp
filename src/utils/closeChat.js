export const closeChat = (toggleContactInfoDispatch, setChat, localStorage) => {
  toggleContactInfoDispatch("hide");
  setChat(false);
  localStorage.removeItem("chat");
};

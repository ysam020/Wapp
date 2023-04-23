// Components
import * as Icons from "../components/Icons";
// utils
import { deleteChat } from "../utils/deleteChat";
import { blockUser } from "../utils/blockUser";
import { unblockUser } from "../utils/unblockUser";
import FirebaseRefs from "../components/FirebaseRefs";
// Custom hooks
import useContexts from "./contexts";
import useChatUser from "./chatUser";

///////////////////////////////////////////////////////////////////
function useContactInfoActions(setChat, blockLength, handleOpenModal) {
  // Custom hooks
  const { currentUser, emailId } = useContexts();
  const { chatUser } = useChatUser();

  // db Ref
  const firebaseRef = emailId ? FirebaseRefs(emailId, currentUser) : "";

  const contactInfoActions = [
    {
      id: 1,
      name: blockLength === 0 ? "Block" : "Unblock",
      icon: <Icons.BlockIcon sx={{ color: "#F15C6D" }} />,
      className: "block",
      onClick: () => {
        blockLength === 0
          ? blockUser(currentUser, chatUser)
          : unblockUser(currentUser, emailId);
      },
    },
    {
      id: 2,
      name: "Report",
      icon: <Icons.ThumbDownAltIcon sx={{ color: "#F15C6D" }} />,
      className: "report",
      onClick: () => {
        handleOpenModal();
      },
    },
    {
      id: 3,
      name: "Delete chat",
      icon: <Icons.DeleteIcon sx={{ color: "#F15C6D" }} />,
      className: "delete-chat",
      onClick: () => {
        deleteChat(
          emailId,
          currentUser,
          firebaseRef.senderMessageCollectionRef,
          firebaseRef.receiverMessageCollectionRef,
          firebaseRef.senderFriendListRef,
          firebaseRef.receiverFriendListRef,
          setChat()
        );
      },
    },
  ];
  return contactInfoActions;
}

export default useContactInfoActions;

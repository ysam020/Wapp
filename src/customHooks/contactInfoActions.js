// Components
import * as Icons from "../components/Icons";
// utils
import { deleteChat } from "../utils/deleteChat";
import { blockUser } from "../utils/blockUser";
import { unblockUser } from "../utils/unblockUser";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useContactInfoActions(handleOpenModal, block) {
  // Custom hooks
  const { currentUser, chatDetailsContext } = useContexts();

  const contactInfoActions = [
    {
      id: 1,
      name: block.length === 0 ? "Block" : "Unblock",
      icon: <Icons.BlockIcon sx={{ color: "#F15C6D" }} />,
      className: "block",
      onClick: () => {
        block.length === 0
          ? blockUser(currentUser, chatDetailsContext.chatUser.email)
          : unblockUser(currentUser, chatDetailsContext.chatUser.email);
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
          chatDetailsContext.chatUser.email,
          currentUser,
          chatDetailsContext.setChat
        );
      },
    },
  ];
  return contactInfoActions;
}

export default useContactInfoActions;

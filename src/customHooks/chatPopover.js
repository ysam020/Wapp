import { useState } from "react";
// utils
import { deleteChat } from "../utils/deleteChat";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useChatPopover(toggleDrawer) {
  // useState
  const [chatPopover, setChatPopover] = useState(false);

  // Custom hooks
  const { chatDetailsContext, currentUser } = useContexts();

  const chatPropoverList = [
    {
      id: 1,
      name: "Contact info",
      onClick: toggleDrawer("contactInfo", true),
    },
    {
      id: 2,
      name: "Select messages",
      onClick: () => {
        chatDetailsContext.setSelectMessagesUI(
          !chatDetailsContext.selectMessagesUI
        );
        setChatPopover(!chatPopover);
      },
    },
    {
      id: 3,
      name: "Close chat",
      onClick: () => {
        chatDetailsContext.closeChat();
        setChatPopover(!chatPopover);
      },
    },

    {
      id: 4,
      name: "Mute notifications",
      onClick: () => {},
    },

    {
      id: 5,
      name: "Clear messages",
      onClick: () => {},
    },

    {
      id: 6,
      name: "Disappearing messages",
      onClick: toggleDrawer("disappearingMessages", true),
    },

    {
      id: 7,
      name: "Delete chat",
      onClick: () => {
        deleteChat(
          chatDetailsContext.chatUser.email,
          currentUser,
          chatDetailsContext.setChat
        );
        setChatPopover(!chatPopover);
      },
    },
  ];
  return { chatPropoverList, chatPopover, setChatPopover };
}

export default useChatPopover;

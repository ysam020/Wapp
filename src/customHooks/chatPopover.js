import { useState } from "react";
import useContexts from "./contexts";
import { deleteChat } from "../utils/deleteChat";

function useChatPopover() {
  // useState
  const [chatPopover, setChatPopover] = useState(false);

  const {
    toggleContactInfoDispatch,
    chatDetailsContext,
    disappearingMessagesDispatch,
    currentUser,
    emailId,
  } = useContexts();

  const chatPropoverList = [
    {
      id: 1,
      name: "Contact info",
      onClick: () => {
        toggleContactInfoDispatch("toggle");
        setChatPopover(!chatPopover);
      },
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
      onClick: () => {
        disappearingMessagesDispatch("toggle");
        setChatPopover(!chatPopover);
      },
    },

    {
      id: 7,
      name: "Delete chat",
      onClick: () => {
        deleteChat(emailId, currentUser, chatDetailsContext.setChat);
        setChatPopover(!chatPopover);
      },
    },
  ];
  return { chatPropoverList, chatPopover, setChatPopover };
}

export default useChatPopover;

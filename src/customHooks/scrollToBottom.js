import { useRef, useEffect } from "react";

///////////////////////////////////////////////////////////////////
function useScrollToBottom(chatMessages) {
  // Ref
  const chatBox = useRef(null);

  // Scroll to bottom of chat when message is sent or received
  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]); // Run each time chatMessages is update

  return { chatBox };
}

export default useScrollToBottom;

import React from "react";

function useScrollToBottom(chatMessages) {
  // Ref
  const chatBox = React.useRef(null);

  // Scroll to bottom of chat when message is sent or received
  React.useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]); // Run each time chatMessages is update

  return { chatBox };
}

export default useScrollToBottom;

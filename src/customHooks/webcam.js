import { useState, useEffect, useRef } from "react";

///////////////////////////////////////////////////////////////////
function useWebcam(block) {
  // useRef
  const sendMessageRef = useRef(null);

  // useState
  const [showWebcam, setShowWebcam] = useState(false);
  const [selectMessagesUI, setSelectMessagesUI] = useState(false);

  useEffect(() => {
    // Focus send message input
    if (
      showWebcam === false &&
      selectMessagesUI === false &&
      block.length === 0
    ) {
      sendMessageRef.current.focus();
    }
  });
  return {
    showWebcam,
    setShowWebcam,
    selectMessagesUI,
    setSelectMessagesUI,
    sendMessageRef,
  };
}

export default useWebcam;

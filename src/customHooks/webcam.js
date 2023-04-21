import React from "react";

function useWebcam(block) {
  const sendMessageRef = React.useRef(null);

  const [showWebcam, setShowWebcam] = React.useState(false);
  const [selectMessagesUI, setSelectMessagesUI] = React.useState(false);

  React.useEffect(() => {
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

import React from "react";
// Components
import Checkbox from "@mui/material/Checkbox";
import ChatMessage from "./ChatMessage";
// utils
import { getTimeAgo } from "../../utils/getTimeAgo";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function SelectMessagesUI(props) {
  // Custom hooks
  const { chatDetailsContext } = useContexts();

  // Check if message timestamp is same as that of previous message timestamp
  const getPreviousMessageDate = (index) => {
    const messages = chatDetailsContext.chatMessages;
    const currentDate = messages[index].timestamp.toDate().toLocaleDateString();
    const prevDate = messages[index + 1]?.timestamp
      .toDate()
      .toLocaleDateString();

    return index === messages.length - 1
      ? currentDate
      : currentDate === prevDate
      ? null
      : currentDate !== prevDate
      ? currentDate
      : null;
  };

  return (
    <div
      className={
        chatDetailsContext.selectMessagesUI
          ? "message-row select-messages"
          : "message-row"
      }
      key={props.index}
    >
      {chatDetailsContext.selectMessagesUI && (
        <Checkbox
          sx={{
            color: "#8696A0",
            "&.Mui-checked": {
              color: "#04A784",
            },
          }}
          disableRipple={true}
          onChange={(event) => {
            if (event.target.checked) {
              chatDetailsContext.setSelectedMessages([
                ...chatDetailsContext.selectedMessages,
                props.message.messageId,
              ]);
            } else {
              chatDetailsContext.setSelectedMessages(
                chatDetailsContext.selectedMessages.filter(
                  (item) => item !== chatDetailsContext.message.messageId
                )
              );
            }
          }}
        />
      )}

      <div className="chat-message-box">
        <div className="chat-date">
          {getPreviousMessageDate(props.index) && (
            <p>{getTimeAgo(props.index, getPreviousMessageDate)}</p>
          )}
        </div>
        <ChatMessage
          message={props.message.text}
          starredMessage={props.message.starred}
          time={props.message.timestamp}
          sender={props.message.senderEmail}
          read={props.message.read}
          imageURL={props.message.imageURL}
          imageName={props.message.imageName}
          videoURL={props.message.videoURL}
          videoName={props.message.videoName}
          fileURL={props.message.fileURL}
          fileName={props.message.fileName}
          extension={props.message.extension}
        />
      </div>
    </div>
  );
}

export default React.memo(SelectMessagesUI);

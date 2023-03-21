import React from "react";
import Checkbox from "@mui/material/Checkbox";
import ChatMessage from "./ChatMessage";
import { getTimeAgo } from "../../utils/getTimeAgo";

function SelectMessagesUI(props) {
  // Check if message timestamp is same as that of previous message timestamp
  const getPreviousMessageDate = (index) => {
    return index === 0
      ? props.chatMessages[0].timestamp.toDate().toLocaleDateString()
      : props.chatMessages[index].timestamp.toDate().toLocaleDateString() ===
        props.chatMessages[index - 1].timestamp.toDate().toLocaleDateString()
      ? null
      : props.chatMessages[index].timestamp.toDate().toLocaleDateString();
  };

  return (
    <div
      className={
        props.selectMessagesUI ? "message-row select-messages" : "message-row"
      }
      key={props.index}
    >
      {props.selectMessagesUI && (
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
              props.setSelectedMessages([
                ...props.selectedMessages,
                props.message.messageId,
              ]);
            } else {
              props.setSelectedMessages(
                props.selectedMessages.filter(
                  (item) => item !== props.message.messageId
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

export default SelectMessagesUI;

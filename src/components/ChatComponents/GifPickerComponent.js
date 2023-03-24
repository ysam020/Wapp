import React, { useContext } from "react";
import Tenor from "react-tenor";
import { selectGif } from "../../utils/selectGIF";
import {
  UserContext,
  EmailContext,
  ChatDetailsContext,
} from "../../contexts/Context";

function GifPickerComponent(props) {
  // useContext
  const currentUser = useContext(UserContext);
  const emailId = useContext(EmailContext);
  const chatDetailsContext = useContext(ChatDetailsContext);

  return (
    <Tenor
      defaultResults={true}
      limit={1000}
      searchPlaceholder="Search GIFs via Tenor"
      onSelect={(result) =>
        selectGif(
          currentUser,
          emailId,
          chatDetailsContext.message,
          chatDetailsContext.chatMessages,
          chatDetailsContext.chatUser,
          result
        )
      }
    />
  );
}

export default GifPickerComponent;

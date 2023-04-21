import React from "react";
import Tenor from "react-tenor";
import { selectGif } from "../../utils/selectGIF";
import useContexts from "../../customHooks/contexts";

function GifPickerComponent(props) {
  const { currentUser, emailId, chatDetailsContext } = useContexts();

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

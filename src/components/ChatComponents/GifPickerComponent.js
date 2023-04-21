import React from "react";
// Components
import Tenor from "react-tenor";
// utils
import { selectGif } from "../../utils/selectGIF";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function GifPickerComponent() {
  // Custom hooks
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

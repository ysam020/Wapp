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
  const { currentUser, chatDetailsContext } = useContexts();

  return (
    <Tenor
      defaultResults={true}
      limit={1000}
      searchPlaceholder="Search GIFs via Tenor"
      onSelect={(result) =>
        selectGif(
          currentUser,
          chatDetailsContext.chatUser.email,
          chatDetailsContext.message,
          chatDetailsContext.chatMessages,
          chatDetailsContext.chatUser,
          result
        )
      }
    />
  );
}

export default React.memo(GifPickerComponent);

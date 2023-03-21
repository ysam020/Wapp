import React, { useContext } from "react";
import Tenor from "react-tenor";
import { selectGif } from "../../utils/selectGIF";
import { UserContext } from "../../contexts/Context";
import firebase from "firebase/app";

function GifPickerComponent(props) {
  // useContext
  const currentUser = useContext(UserContext);

  return (
    <Tenor
      defaultResults={true}
      limit={1000}
      searchPlaceholder="Search GIFs via Tenor"
      onSelect={(result) =>
        selectGif(
          currentUser,
          props.emailId,
          props.message,
          props.chatMessages,
          props.chatUser,
          firebase,
          props.sendMessageToDatabase,
          result
        )
      }
    />
  );
}

export default GifPickerComponent;

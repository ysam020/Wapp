import React from "react";
import useContexts from "./contexts";
import chatDoodle from "../assets/images/chat-doodle.png";

function useChatWallpaper() {
  const [chatWallpaper, setChatWallpaper] = React.useState("");
  const { doodle } = useContexts();

  // Wallpaper doodles
  React.useEffect(() => {
    if (doodle) {
      setChatWallpaper(chatDoodle);
    } else {
      setChatWallpaper("");
    }
  }, [doodle]);

  return { chatWallpaper, setChatWallpaper };
}

export default useChatWallpaper;

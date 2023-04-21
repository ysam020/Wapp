import { useState, useEffect } from "react";
// Assets
import chatDoodle from "../assets/images/chat-doodle.png";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useChatWallpaper() {
  // useState
  const [chatWallpaper, setChatWallpaper] = useState("");
  // Custom hooks
  const { doodle } = useContexts();

  // Wallpaper doodles
  useEffect(() => {
    if (doodle) {
      setChatWallpaper(chatDoodle);
    } else {
      setChatWallpaper("");
    }
  }, [doodle]);

  return { chatWallpaper, setChatWallpaper };
}

export default useChatWallpaper;

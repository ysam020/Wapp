import React, { useContext } from "react";
import EmojiPicker from "emoji-picker-react";
import { ChatDetailsContext } from "../../contexts/Context";

function EmojiPickerComponent() {
  const chatDetailsContext = useContext(ChatDetailsContext);

  return (
    <EmojiPicker
      onEmojiClick={(event, emojiObject) => {
        chatDetailsContext.setMessage(
          chatDetailsContext.message + emojiObject.emoji
        );
        chatDetailsContext.sendMessageRef.current.focus();
      }}
      groupNames={{
        smileys_people: "Smileys and People",
        animals_nature: "Animals & Nature",
        food_drink: "Food & Drink",
        travel_places: "Travel & Places",
        activities: "Activity",
        objects: "Objects",
        symbols: "Symbols",
        flags: "Flags",
        recently_used: "Recent",
      }}
      searchPlaceholder="Search Emoji"
      preload={true}
    />
  );
}

export default EmojiPickerComponent;

import React from "react";
import EmojiPicker from "emoji-picker-react";
import useContexts from "../../customHooks/contexts";

function EmojiPickerComponent() {
  const { chatDetailsContext } = useContexts();

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

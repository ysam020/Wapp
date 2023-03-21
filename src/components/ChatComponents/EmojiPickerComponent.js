import React from "react";
import EmojiPicker from "emoji-picker-react";

function EmojiPickerComponent(props) {
  return (
    <EmojiPicker
      onEmojiClick={(event, emojiObject) => {
        props.setMessage(props.message + emojiObject.emoji);
        props.sendMessageRef.current.focus();
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

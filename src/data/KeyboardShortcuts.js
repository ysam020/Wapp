const keyboardShortcuts = [
  {
    id: 1,
    name: "Mark as Unread",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Shift" }, { cmd: "U" }],
  },
  {
    id: 2,
    name: "Mute",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Shift" }, { cmd: "M" }],
  },
  {
    id: 3,
    name: "Archive Chat",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Shift" }, { cmd: "E" }],
  },
  {
    id: 4,
    name: "Delete Chat",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Backspace" }],
  },
  {
    id: 5,
    name: "Pin Chat",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Shift" }, { cmd: "P" }],
  },
  {
    id: 6,
    name: "Search",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "/" }],
  },
  {
    id: 7,
    name: "Search Chat",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Shift" }, { cmd: "F" }],
  },
  {
    id: 8,
    name: "New Chat",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "N" }],
  },
  {
    id: 9,
    name: "Next Chat",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Tab" }],
  },
  {
    id: 10,
    name: "Previous Chat",
    command: [
      { cmd: "Cmd" },
      { cmd: "Ctrl" },
      { cmd: "Shift" },
      { cmd: "Tab" },
    ],
  },
  {
    id: 11,
    name: "Close Chat",
    command: [{ cmd: "Escape" }],
  },
  {
    id: 12,
    name: "New Group",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "Shift" }, { cmd: "N" }],
  },
  {
    id: 13,
    name: "Profile and About",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "P" }],
  },
  {
    id: 14,
    name: "Increase Speed of Selected Voice Message",
    command: [{ cmd: "Shift" }, { cmd: "." }],
  },
  {
    id: 15,
    name: "Decrease Speed of Selected Voice Message",
    command: [{ cmd: "Shift" }, { cmd: "," }],
  },
  {
    id: 16,
    name: "Settings",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "," }],
  },
  {
    id: 17,
    name: "Emoji Panel",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "E" }],
  },
  {
    id: 18,
    name: "Gif Panel",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "G" }],
  },
  {
    id: 19,
    name: "Sticker Panel",
    command: [{ cmd: "Cmd" }, { cmd: "Ctrl" }, { cmd: "S" }],
  },
  {
    id: 20,
    name: "Extended Search",
    command: [{ cmd: "Cmd" }, { cmd: "K" }],
  },
];

export default keyboardShortcuts;

import * as Icons from "../components/Icons";
import useContexts from "./contexts";

function useContactInfoList() {
  const {
    toggleContactInfoDispatch,
    starredMessageDispatch,
    disappearingMessagesDispatch,
    encryptionDispatch,
  } = useContexts();

  const contactInfoList = [
    {
      id: 1,
      title: "Starred messages",
      desc: "",
      icon: <Icons.StarRateRoundedIcon />,
      className: "starred-messages",
      onClick: () => {
        toggleContactInfoDispatch("toggle");
        starredMessageDispatch("toggle");
      },
    },
    {
      id: 2,
      title: "Mute notifications",
      desc: "",
      icon: <Icons.NotificationsRoundedIcon />,
      className: "mute-notification",
      onClick: () => {},
    },
    {
      id: 3,
      title: "Disappearing messages",
      desc: "Off",
      icon: <Icons.HistoryIcon />,
      className: "disappearing-messages",
      onClick: () => {
        toggleContactInfoDispatch("toggle");
        disappearingMessagesDispatch("toggle");
      },
    },
    {
      id: 4,
      title: "Encryption",
      desc: "Messages are end-to-end encrypted. Click to verify.",
      icon: <Icons.LockIcon />,
      className: "encryption",
      onClick: () => {
        toggleContactInfoDispatch("toggle");
        encryptionDispatch("toggle");
      },
    },
  ];
  return contactInfoList;
}

export default useContactInfoList;

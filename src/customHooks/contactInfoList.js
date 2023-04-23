// Components
import * as Icons from "../components/Icons";

///////////////////////////////////////////////////////////////////
function useContactInfoList(toggleDrawer) {
  const contactInfoList = [
    {
      id: 1,
      title: "Starred messages",
      desc: "",
      icon: <Icons.StarRateRoundedIcon color="primary" />,
      className: "starred-messages",
      onClick: toggleDrawer("starredMessages", true),
    },
    {
      id: 2,
      title: "Mute notifications",
      desc: "",
      icon: <Icons.NotificationsRoundedIcon color="primary" />,
      className: "mute-notification",
      onClick: () => {},
    },
    {
      id: 3,
      title: "Disappearing messages",
      desc: "Off",
      icon: <Icons.HistoryIcon color="primary" />,
      className: "disappearing-messages",
      onClick: toggleDrawer("disappearingMessages", true),
    },
    {
      id: 4,
      title: "Encryption",
      desc: "Messages are end-to-end encrypted. Click to verify.",
      icon: <Icons.LockIcon color="primary" />,
      className: "encryption",
      onClick: toggleDrawer("encryption", true),
    },
  ];
  return contactInfoList;
}

export default useContactInfoList;

import useContexts from "./contexts";

function useSidebarPopover() {
  const { toggleSettingsDispatch, toggleSidebarDispatch, logout } =
    useContexts();

  const sidebarPropoverList = [
    {
      id: 1,
      name: "New Group",
      onClick: () => {},
    },
    {
      id: 2,
      name: "Starred Message",
      onClick: () => {},
    },
    {
      id: 3,
      name: "Settings",
      onClick: () => {
        toggleSettingsDispatch("toggle");
        toggleSidebarDispatch("toggle");
      },
    },
    {
      id: 4,
      name: "Logout",
      onClick: () => {
        logout();
      },
    },
  ];
  return sidebarPropoverList;
}

export default useSidebarPopover;

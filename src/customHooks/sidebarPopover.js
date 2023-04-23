// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useSidebarPopover(toggleDrawer) {
  // Custom hooks
  const { logout } = useContexts();

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
      onClick: toggleDrawer("settings", true),
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

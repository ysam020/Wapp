import React, { useState } from "react";
// Components
import Menu from "@mui/material/Menu";
// Custom hooks
import useChatPopover from "../../customHooks/chatPopover";
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function ChatContextMenu(props) {
  const { chatPropoverList } = useChatPopover(props.toggleDrawer);
  const { theme } = useContexts();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleClose = () => {
    props.setContextMenu(null);
  };

  return (
    <Menu
      open={props.contextMenu !== null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        props.contextMenu !== null
          ? { top: props.contextMenu.mouseY, left: props.contextMenu.mouseX }
          : undefined
      }
      PaperProps={{
        sx: { backgroundColor: theme === "light" ? "#fff" : "#1F2C33" },
      }}
    >
      {chatPropoverList.map((item, index) => {
        return (
          <h4
            key={item.id}
            onClick={() => {
              item.onClick();
              handleClose();
            }}
            onMouseOver={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              fontSize: "14px",
              lineHeight: "14px",
              color: theme === "light" ? "#3b4a54" : "#fff",
              padding: "13px 85px 13px 25px",
              textAlign: "left",
              fontWeight: "500",
              cursor: "pointer",
              backgroundColor:
                theme === "light" && hoveredIndex === index
                  ? "#F5F6F6"
                  : theme === "dark" && hoveredIndex === index
                  ? "#111B21"
                  : "",
            }}
          >
            {item.name}
          </h4>
        );
      })}
    </Menu>
  );
}

export default ChatContextMenu;

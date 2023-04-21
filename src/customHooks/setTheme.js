import { useState } from "react";

///////////////////////////////////////////////////////////////////
function useSetTheme() {
  // Theme
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  if (JSON.parse(localStorage.getItem("theme")) === null) {
    localStorage.setItem("theme", JSON.stringify("light"));
    setTheme("light");
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setChatBackground(theme === "light" ? "#0C141A" : "#EFEAE2");

    if (theme === "light") {
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      localStorage.setItem("theme", JSON.stringify("light"));
    }
  };

  // Chat wallpaper
  const [doodle, setDoodle] = useState(
    JSON.parse(localStorage.getItem("doodle"))
  );

  if (JSON.parse(localStorage.getItem("doodle")) === null) {
    localStorage.setItem("doodle", JSON.stringify(true));
    setDoodle(true);
  }

  const [chatBackground, setChatBackground] = useState(
    JSON.parse(localStorage.getItem("chatBackground"))
  );

  if (JSON.parse(localStorage.getItem("chatBackground")) === null) {
    setChatBackground(
      theme === null ? "#EFEAE2" : theme === "light" ? "#EFEAE2" : "#0C141A"
    );

    localStorage.setItem(
      "chatBackground",
      JSON.stringify(
        theme === null ? "#EFEAE2" : theme === "light" ? "#EFEAE2" : "#0C141A"
      )
    );
  }

  return {
    doodle,
    setDoodle,
    chatBackground,
    setChatBackground,
    theme,
    toggleTheme,
  };
}

export default useSetTheme;

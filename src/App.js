// Styles
import "./App.css";
// Components
import Login from "./pages/Login";
import Home from "./pages/Home";
// Contexts
import * as Context from "./contexts/Context";
// MUI theme
import { ThemeProvider } from "@mui/material/styles";
// Routes
import { Routes, Route } from "react-router-dom";
// Custom hooks
import useMuiTheme from "./customHooks/muiTheme";
import useSignIn from "./customHooks/signIn";
import useLogout from "./customHooks/logout";
import useSetTheme from "./customHooks/setTheme";

///////////////////////////////////////////////////////////////////
function App() {
  // Custom hooks
  const muiTheme = useMuiTheme();
  const { signIn, user, setUser } = useSignIn();
  const logout = useLogout(setUser);
  const {
    theme,
    toggleTheme,
    doodle,
    setDoodle,
    chatBackground,
    setChatBackground,
  } = useSetTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <Context.ChatBackgroundContext.Provider
        value={{ chatBackground, setChatBackground, doodle, setDoodle }}
      >
        <Context.ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Context.UserContext.Provider value={user}>
            <Context.AuthContext.Provider
              value={{ signIn: signIn, logout: logout }}
            >
              <div className="App" id={theme}>
                {!user ? (
                  <Login />
                ) : (
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                  </Routes>
                )}
              </div>
            </Context.AuthContext.Provider>
          </Context.UserContext.Provider>
        </Context.ThemeContext.Provider>
      </Context.ChatBackgroundContext.Provider>
    </ThemeProvider>
  );
}

export default App;

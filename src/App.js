import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Context, {
  AuthContext,
  UserContext,
  ThemeContext,
  ChatBackgroundContext,
} from "./contexts/Context";
import { ThemeProvider } from "@mui/material/styles";
import useMuiTheme from "./customHooks/muiTheme";
import useSignIn from "./customHooks/signIn";
import useLogout from "./customHooks/logout";
import useSetTheme from "./customHooks/setTheme";

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
      <ChatBackgroundContext.Provider
        value={{ chatBackground, setChatBackground, doodle, setDoodle }}
      >
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <UserContext.Provider value={user}>
            <AuthContext.Provider value={{ signIn: signIn, logout: logout }}>
              <Context>
                <div className="App" id={theme}>
                  {!user ? (
                    <Login />
                  ) : (
                    <div className="app-body">
                      <Routes>
                        <Route path="/" element={<Home />}></Route>
                      </Routes>
                    </div>
                  )}
                </div>
              </Context>
            </AuthContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </ChatBackgroundContext.Provider>
    </ThemeProvider>
  );
}

export default App;

import { useState, useEffect, useContext } from "react";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Context, {
  LoginContext,
  LogoutContext,
  UserContext,
  ThemeContext,
  ChatBackgroundContext,
} from "./contexts/Context";
import firebase from "firebase/app";
import db, { auth, provider, messaging } from "./firebase";

function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Parse user from local storage, if present
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  //Login
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          timestamp: firebase.firestore.Timestamp.now(),
          about: "Hey there, I'm using Wapp",
        };

        // Set User
        setUser(newUser);

        // Add user to local storage
        localStorage.setItem("user", JSON.stringify(newUser));

        // Add user to users collection in database
        db.collection("users").doc(result.user.email).set(newUser);

        // Navigate to home after sign in
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  // Logout
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        // Remove user from local storage
        localStorage.removeItem("user");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    // Loader
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  // Theme
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  if (JSON.parse(localStorage.getItem("theme")) === null) {
    localStorage.setItem("theme", JSON.stringify("light"));
    setTheme("light");
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    setChatBackground(theme === "light" ? "#0C141A" : "#EFEAE2 ");

    if (theme === "light") {
      localStorage.setItem("theme", JSON.stringify("dark"));
    } else {
      localStorage.setItem("theme", JSON.stringify("light"));
    }
  };

  // Chat wallpaper
  // Wallpaper doodle
  const [doodle, setDoodle] = useState(true);
  const [chatBackground, setChatBackground] = useState(
    theme === "light" ? "#EFEAE2" : "#0C141A"
  );

  async function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        messaging
          .getToken({
            vapidKey:
              "BAj_ssV_kzcLdf5doRDRW4GHTWvUOOho6rnH6RkgyvEOh9rBUbFW2FWkxlL7DQhetLdNslOMAeCClhbkNR3zP90",
          })
          .then((currentToken) => {
            if (currentToken) {
              console.log(currentToken);
            } else {
              // Show permission request UI
              console.log("Permission denied");
              // ...
            }
          })
          .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // ...
          });
      }
    });
  }

  useEffect(() => {
    requestPermission();
  });

  return (
    <ChatBackgroundContext.Provider
      value={{ chatBackground, setChatBackground, doodle, setDoodle }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <UserContext.Provider value={user}>
          <LoginContext.Provider value={signIn}>
            <LogoutContext.Provider value={logout}>
              <Context>
                <div className="App" id={theme}>
                  {loading ? <Loader /> : ""}
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
            </LogoutContext.Provider>
          </LoginContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </ChatBackgroundContext.Provider>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Context, {
  AuthContext,
  UserContext,
  ThemeContext,
  ChatBackgroundContext,
} from "./contexts/Context";
import firebase from "firebase/app";
import db, { auth, provider } from "./firebase";

function App() {
  const [loading, setLoading] = useState(true);
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
        localStorage.removeItem("chat");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    // Loader
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

  return (
    <ChatBackgroundContext.Provider
      value={{ chatBackground, setChatBackground, doodle, setDoodle }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <UserContext.Provider value={user}>
          <AuthContext.Provider value={{ signIn: signIn, logout: logout }}>
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
          </AuthContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </ChatBackgroundContext.Provider>
  );
}

export default App;

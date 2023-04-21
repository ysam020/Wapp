import { auth } from "../firebase";

///////////////////////////////////////////////////////////////////
function useLogout(setUser) {
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

  return logout;
}

export default useLogout;

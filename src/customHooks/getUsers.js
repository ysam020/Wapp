import { useEffect, useState } from "react";
import db from "../firebase";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useGetUsers() {
  // useState
  const [allUsers, setAllUsers] = useState([]);

  // db Ref
  const usersCollectionRef = db.collection("users");

  // Custom hooks
  const { currentUser } = useContexts();

  useEffect(() => {
    // Get all users
    usersCollectionRef.onSnapshot((snapshot) => {
      setAllUsers(
        snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email) // Get all users whose email id is not same as the email of current user
      );
    });

    // eslint-disable-next-line
  }, []);
  return { allUsers };
}

export default useGetUsers;

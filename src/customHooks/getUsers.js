import { useEffect, useState } from "react";
import db from "../firebase";
import useContexts from "./contexts";

function useGetUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const { currentUser } = useContexts();
  const usersCollectionRef = db.collection("users");

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

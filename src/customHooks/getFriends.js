import { useState, useCallback, useEffect } from "react";
// utils
import db from "../firebase";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useGetFriends() {
  // useState
  const [friendList, setFriendList] = useState([]);

  // Custom hooks
  const { currentUser } = useContexts();

  // db Ref
  var senderFriendListCollectionRef = db
    .collection("FriendList")
    .doc(currentUser.email)
    .collection("list");

  // Get friends from FriendList databse
  const getFriends = useCallback(() => {
    senderFriendListCollectionRef
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFriendList(snapshot.docs);
      });
    // eslint-disable-next-line
  }, [friendList]);

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, []);

  return { friendList };
}

export default useGetFriends;

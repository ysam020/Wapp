import { useState, useCallback, useEffect } from "react";
import db from "../firebase";
import useContexts from "./contexts";

function useGetFriends() {
  const [friendList, setFriendList] = useState([]);
  const { currentUser } = useContexts();

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

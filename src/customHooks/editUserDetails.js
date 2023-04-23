import { useState, useEffect, useRef } from "react";
// utils
import db from "../firebase";
// Custom hooks
import useContexts from "./contexts";

///////////////////////////////////////////////////////////////////
function useEditUserDetails(updateName, updateAbout) {
  // useState
  const [fullname, setFullname] = useState("");
  const [about, setAbout] = useState("");

  // useRef
  const editNameRef = useRef();
  const editAboutRef = useRef();
  const editNameInputRef = useRef();
  const editAboutInputRef = useRef();

  // Custom hooks
  const { currentUser } = useContexts();

  // db Ref
  const userRef = db.collection("users").doc(currentUser.email);

  useEffect(() => {
    userRef.onSnapshot((snapshot) => setFullname(snapshot.data().fullname));
    userRef.onSnapshot((snapshot) => setAbout(snapshot.data().about));

    editNameInputRef.current.setSelectionRange(
      editNameInputRef.current.value.length,
      editNameInputRef.current.value.length
    );

    editAboutInputRef.current.setSelectionRange(
      editAboutInputRef.current.value.length,
      editAboutInputRef.current.value.length
    );
    // eslint-disable-next-line
  }, [updateName, updateAbout]);

  return {
    fullname,
    about,
    editNameRef,
    editAboutRef,
    editNameInputRef,
    editAboutInputRef,
  };
}

export default useEditUserDetails;

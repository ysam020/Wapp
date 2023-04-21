import { useRef } from "react";
import * as Icons from "../components/Icons";

function useSendMediaList() {
  const inputImagesRef = useRef();
  const inputVideosRef = useRef();
  const inputDocumentRef = useRef();

  const sendMediaList = [
    {
      id: 1,
      title: "Photos",
      backgroundImage: "linear-gradient(180deg, #ac44cf 25px, #bf59cf 25px)",
      mediaType: "image/*",
      ref: inputImagesRef,
      label: "photo",
      icon: <Icons.InsertPhotoIcon sx={{ color: "#fff" }} />,
    },
    {
      id: 2,
      title: "Videos",
      backgroundImage: "linear-gradient(180deg, #0162CB 25px, #0070E6 25px)",
      mediaType: "video/mp4,video/3gpp,video/quicktime",
      ref: inputVideosRef,
      label: "video",
      icon: <Icons.VideoCameraBackIcon sx={{ color: "#fff" }} />,
    },
    {
      id: 3,
      title: "Documents",
      backgroundImage: "linear-gradient(180deg, #0F9186 25px, #04A598 25px)",
      mediaType: "*",
      label: "document",
      ref: inputDocumentRef,
      icon: <Icons.InsertDriveFileIcon sx={{ color: "#fff" }} />,
    },
    {
      id: 4,
      title: "Camera",
      backgroundImage: "linear-gradient(180deg, #D3396D 25px, #EC407A 25px)",
      mediaType: "video/mp4,video/3gpp,video/quicktime",
      ref: inputVideosRef,
      label: "camera",
    },
  ];
  return sendMediaList;
}

export default useSendMediaList;

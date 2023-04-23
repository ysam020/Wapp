import React, { useRef } from "react";
import { storage } from "../../firebase";
// Components
import * as Icons from "../Icons";
import { IconButton } from "@material-ui/core";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
// utils
import { clickImage } from "../../utils/clickImage";
// Custom hooks
import useContexts from "../../customHooks/contexts";

///////////////////////////////////////////////////////////////////
function WebcamComponents() {
  // Custom hooks
  const { currentUser, emailId, chatDetailsContext } = useContexts();

  // useRef
  const webcamRef = useRef(null);

  return (
    <div className="webcam-container">
      <div className="webcam-header">
        <IconButton
          aria-label="close"
          onClick={() => {
            chatDetailsContext.setShowWebcam(false);
            chatDetailsContext.setCircularProgress(true);
          }}
        >
          <Icons.CloseOutlinedIcon color="secondary" />
        </IconButton>
        <h3>Take Photo</h3>
      </div>
      {!chatDetailsContext.circularProgress ? (
        <>
          <Webcam className="webcam" ref={webcamRef} />
          <Icons.CameraAltRoundedIcon
            color="secondary"
            sx={{
              backgroundColor: "#04A784",
              padding: "20px",
              borderRadius: "50%",
              transform: "translateY(-30px)",
              cursor: "pointer",
            }}
            onClick={() =>
              clickImage(
                webcamRef,
                storage,
                currentUser,
                emailId,
                chatDetailsContext.chatUser,
                chatDetailsContext.message,
                chatDetailsContext.chatMessages,
                chatDetailsContext.setShowWebcam,
                chatDetailsContext.setCircularProgress
              )
            }
          />
        </>
      ) : (
        <div className="webcam-body">
          <CircularProgress
            color="primary"
            sx={{
              width: "60px !important",
              height: "60px !important",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(WebcamComponents);

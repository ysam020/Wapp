import React, { useRef } from "react";
import { IconButton } from "@material-ui/core";
import * as Icons from "../Icons";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import { clickImage } from "../../utils/clickImage";
import { storage } from "../../firebase";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useContexts from "../../customHooks/contexts";

const useStyles = makeStyles((theme) =>
  createStyles({
    webcamCameraIcon: {
      color: "#fff",
      backgroundColor: "#04A784",
      padding: "20px",
      borderRadius: "50%",
      transform: "translateY(-30px)",
      cursor: "pointer",
    },
    webcamCloseIcon: { color: "#fff" },
    circularProgressIcon: {
      width: "60px !important",
      height: "60px !important",
      color: "#8696A0 !important",
    },
  })
);

function WebcamComponents() {
  // MUI Styles
  const classes = useStyles();

  // useContext
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
          <Icons.CloseOutlinedIcon className={classes.webcamCloseIcon} />
        </IconButton>
        <h3>Take Photo</h3>
      </div>
      {!chatDetailsContext.circularProgress ? (
        <>
          <Webcam className="webcam" ref={webcamRef} />
          <Icons.CameraAltRoundedIcon
            className={classes.webcamCameraIcon}
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
          <CircularProgress className={classes.circularProgressIcon} />
        </div>
      )}
    </div>
  );
}

export default WebcamComponents;

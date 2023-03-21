import React, { useRef, useContext } from "react";
import { IconButton } from "@material-ui/core";
import * as Icons from "../Icons";
import Webcam from "react-webcam";
import CircularProgress from "@mui/material/CircularProgress";
import { UserContext } from "../../contexts/Context";
import { clickImage } from "../../utils/clickImage";
import { storage } from "../../firebase";
import { createStyles, makeStyles } from "@material-ui/core/styles";

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

function WebcamComponents(props) {
  // MUI Styles
  const classes = useStyles();

  // useContext
  const currentUser = useContext(UserContext);

  // useRef
  const webcamRef = useRef(null);

  return (
    <div className="webcam-container">
      <div className="webcam-header">
        <IconButton
          aria-label="close"
          onClick={() => {
            props.setShowWebcam(false);
            props.setCircularProgress(true);
          }}
        >
          <Icons.CloseOutlinedIcon className={classes.webcamCloseIcon} />
        </IconButton>
        <h3>Take Photo</h3>
      </div>
      {!props.circularProgress ? (
        <>
          <Webcam className="webcam" ref={webcamRef} />
          <Icons.CameraAltRoundedIcon
            className={classes.webcamCameraIcon}
            onClick={() =>
              clickImage(
                webcamRef,
                storage,
                currentUser,
                props.emailId,
                props.chatUser,
                props.message,
                props.chatMessages,
                props.sendMessageToDatabase,
                props.setShowWebcam,
                props.setCircularProgress
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

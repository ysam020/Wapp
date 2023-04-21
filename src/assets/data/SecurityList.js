import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DataSaverOffOutlinedIcon from "@mui/icons-material/DataSaverOffOutlined";

const securityList = [
  {
    id: 1,
    text: "Text and voice messages",
    icon: <ChatBubbleOutlineOutlinedIcon color="primary" />,
  },
  {
    id: 2,
    text: "Audio and video calls",
    icon: <LocalPhoneOutlinedIcon color="primary" />,
  },
  {
    id: 3,
    text: "Photos, videos and documents",
    icon: <AttachFileOutlinedIcon color="primary" />,
  },
  {
    id: 4,
    text: "Location sharing",
    icon: <LocationOnOutlinedIcon color="primary" />,
  },
  {
    id: 5,
    text: "Status updates",
    icon: <DataSaverOffOutlinedIcon color="primary" />,
  },
];

export default securityList;

// import React, { useState, useRef, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/chat.css";
// import { useParams } from "react-router-dom";
// import db from "../firebase";
// import {
//   ThemeContext,
//   ToggleContactInfoContext,
//   UserContext,
//   SearchMessageContext,
// } from "../contexts/Context";
// import ChatMessage from "../components/ChatMessage";

// import { Avatar } from "@material-ui/core";
// import { IconButton } from "@material-ui/core";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
// import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
// import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
// import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
// import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import { createStyles, makeStyles } from "@material-ui/core/styles";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import moment from "moment";
// import EmojiPicker from "emoji-picker-react";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     icon: {
//       color: "#8696A0",
//     },
//   })
// );

// function Chat({
//   chatPopover,
//   handleChatPopover,
//   handleClickAway,
//   message,
//   setMessage,
//   sendMessage,
//   getMessages,
//   chatMessages,
//   chatUser,
//   setChatUser,
//   block,
//   setBlock,
// }) {
//   // MUI Styles
//   const classes = useStyles();

//   const navigate = useNavigate();

//   const sendMessageRef = useRef(null);
//   const chatBox = useRef(null);

//   // Use state
//   const [emojiBox, setEmojiBox] = useState(false);
//   const [closeButton, setCloseButton] = useState(false);
//   const [gifButton, setGifButton] = useState(false);
//   const [lastSeen, setLastSeen] = useState();

//   // Contexts
//   const toggleContactInfoContext = useContext(ToggleContactInfoContext);
//   const themeContext = useContext(ThemeContext);
//   const searchMessageContext = useContext(SearchMessageContext);
//   const currentUser = useContext(UserContext);

//   // Get email id from url
//   const { emailId } = useParams();

//   useEffect(() => {
//     // Get users from database
//     const getUser = async () => {
//       db.collection("users")
//         .doc(emailId)
//         .onSnapshot((snapshot) => setChatUser(snapshot.data()));
//     };

//     // Check blocked user
//     const checkBlockedUser = () => {
//       db.collection("blockedUser")
//         .doc(currentUser.email)
//         .collection("list")
//         .onSnapshot((snapshot) => {
//           setBlock(
//             snapshot.docs.filter((doc) => doc.data().email === chatUser?.email)
//           );
//         });
//     };

//     // Get last online time
//     db.collection("users")
//       .doc(emailId)
//       .onSnapshot((snapshot) => setLastSeen(snapshot.data().lastOnline));

//     getUser();
//     getMessages();
//     checkBlockedUser();
//   }, [
//     chatMessages,
//     chatUser.email,
//     currentUser.email,
//     emailId,
//     setBlock,
//     setChatUser,
//     getMessages,
//   ]); // Run each time chatMessages is update

//   useEffect(() => {
//     document.addEventListener("keydown", (e) => {
//       if (e.keyCode === 27) {
//         // Hide emojiBox on escape key
//         setEmojiBox(false);
//         setCloseButton(false);
//         setGifButton(false);
//       }
//     });

//     // Focus send message input
//     sendMessageRef.current.focus();
//   }, []);

//   // Scroll to bottom of chat when message is sent or received
//   useEffect(() => {
//     chatBox.current.addEventListener("DOMNodeInserted", (event) => {
//       const { currentTarget: target } = event;
//       target.scroll({ top: target.scrollHeight, behavior: "smooth" });
//     });
//   }, [chatMessages]); // Run each time chatMessages is update

//   // Close chat function
//   const closeChat = () => {
//     navigate("/");
//     // Set ToggleContactInfoContext state to false
//     toggleContactInfoContext.toggleContactInfoDispatch("hide");
//   };

//   return (
//     <div className="chat">
//       <div className="chat-header">
//         <IconButton
//           onClick={() => {
//             toggleContactInfoContext.toggleContactInfoDispatch("toggle");
//           }}
//         >
//           <Avatar src={chatUser?.photoURL} />
//         </IconButton>

//         <div className="chat-header-info">
//           <h3>{chatUser?.fullname}</h3>
//           {lastSeen && (
//             <p>{`Last seen ${moment(lastSeen.toDate()).fromNow()}`}</p>
//           )}
//         </div>

//         <div className="chat-header-right">
//           <IconButton
//             className={classes.icon}
//             onClick={() => {
//               searchMessageContext.searchMessageDispatch("toggle");
//             }}
//           >
//             <SearchOutlinedIcon />
//           </IconButton>

//           <div className="chat-popover-container">
//             <IconButton onClick={handleChatPopover} className={classes.icon}>
//               <MoreVertRoundedIcon />
//             </IconButton>
//             {chatPopover && (
//               <ClickAwayListener onClickAway={handleClickAway}>
//                 <div className="chat-popover">
//                   <h4
//                     onClick={() => {
//                       toggleContactInfoContext.toggleContactInfoDispatch(
//                         "toggle"
//                       );
//                       handleChatPopover();
//                     }}
//                   >
//                     Contact info
//                   </h4>
//                   <h4>Select messages</h4>
//                   <h4 onClick={closeChat}>Close chat</h4>
//                   <h4>Mute notifications</h4>
//                   <h4>Disappearing messages</h4>
//                   <h4>Clear messages</h4>
//                   <h4>Delete chat</h4>
//                 </div>
//               </ClickAwayListener>
//             )}
//           </div>
//         </div>
//       </div>

//       <div
//         // Conditional classname for chat body
//         className={
//           themeContext.theme === "light" ? "chat-body" : "chat-body-dark"
//         }
//         ref={chatBox}
//       >
//         <div className="chat-message-container">
//           {chatMessages.map((message, id) => (
//             <ChatMessage
//               key={id}
//               message={message.text}
//               time={message.timestamp}
//               sender={message.senderEmail}
//               read={message.read}
//             />
//           ))}
//         </div>
//       </div>

//       {emojiBox && (
//         <EmojiPicker
//           onEmojiClick={(event, emojiObject) => {
//             setMessage(message + emojiObject.emoji);
//             sendMessageRef.current.focus();
//           }}
//           groupNames={{
//             smileys_people: "Smileys and People",
//             animals_nature: "Animals & Nature",
//             food_drink: "Food & Drink",
//             travel_places: "Travel & Places",
//             activities: "Activity",
//             objects: "Objects",
//             symbols: "Symbols",
//             flags: "Flags",
//             recently_used: "Recent",
//           }}
//           searchPlaceholder="Search Emoji"
//           preload={true}
//         />
//       )}

//       {block.length !== 0 ? (
//         <div className="chat-footer-blocked">
//           <p>Cant send message to a blocked contact {chatUser.email}</p>
//         </div>
//       ) : (
//         <div className="chat-footer">
//           {closeButton && (
//             <IconButton
//               className={classes.icon}
//               onClick={() => {
//                 setEmojiBox(!emojiBox);
//                 setCloseButton(!closeButton);
//                 setGifButton(!gifButton);
//                 sendMessageRef.current.focus();
//               }}
//             >
//               <CloseOutlinedIcon />
//             </IconButton>
//           )}

//           <IconButton
//             className={classes.icon}
//             onClick={() => {
//               setEmojiBox(true);
//               setCloseButton(true);
//               setGifButton(true);
//               sendMessageRef.current.focus();
//             }}
//           >
//             <InsertEmoticonOutlinedIcon />
//           </IconButton>

//           {gifButton && (
//             <IconButton className={classes.icon}>
//               <GifBoxOutlinedIcon />
//             </IconButton>
//           )}

//           <IconButton className={classes.icon}>
//             <AttachFileOutlinedIcon />
//           </IconButton>

//           <form>
//             <input
//               placeholder="Type a message"
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               ref={sendMessageRef}
//             />
//             <button type="submit" onClick={sendMessage}>
//               Send Message
//             </button>
//           </form>

//           <IconButton className={classes.icon}>
//             <MicOutlinedIcon />
//           </IconButton>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;

import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/chat.css";
import { useParams } from "react-router-dom";
import db from "../firebase";
import {
  ThemeContext,
  ToggleContactInfoContext,
  UserContext,
  SearchMessageContext,
} from "../contexts/Context";
import ChatMessage from "../components/ChatMessage";

import { Avatar } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import moment from "moment";
import EmojiPicker from "emoji-picker-react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: "#8696A0",
    },
  })
);

function Chat({
  chatPopover,
  handleChatPopover,
  handleClickAway,
  message,
  setMessage,
  sendMessage,
  getMessages,
  chatMessages,
  chatUser,
  setChatUser,
  block,
  setBlock,
}) {
  // MUI Styles
  const classes = useStyles();

  const navigate = useNavigate();

  const sendMessageRef = useRef(null);
  const chatBox = useRef(null);

  // Use state
  const [emojiBox, setEmojiBox] = useState(false);
  const [closeButton, setCloseButton] = useState(false);
  const [gifButton, setGifButton] = useState(false);
  const [lastSeen, setLastSeen] = useState();

  // Contexts
  const toggleContactInfoContext = useContext(ToggleContactInfoContext);
  const themeContext = useContext(ThemeContext);
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);

  // Get email id from url
  const { emailId } = useParams();

  useEffect(() => {
    // Get users from database
    const getUser = async () => {
      db.collection("users")
        .doc(emailId)
        .onSnapshot((snapshot) => setChatUser(snapshot.data()));
    };

    // Check blocked user
    const checkBlockedUser = () => {
      db.collection("blockedUser")
        .doc(currentUser.email)
        .collection("list")
        .onSnapshot((snapshot) => {
          setBlock(
            snapshot.docs.filter((doc) => doc.data().email === chatUser?.email)
          );
        });
    };

    // Get last online time
    db.collection("users")
      .doc(emailId)
      .onSnapshot((snapshot) => setLastSeen(snapshot.data().lastOnline));

    getUser();
    getMessages();
    checkBlockedUser();
  }, [
    chatMessages,
    chatUser.email,
    currentUser.email,
    emailId,
    setBlock,
    setChatUser,
    getMessages,
  ]); // Run each time chatMessages is update

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        // Hide emojiBox on escape key
        setEmojiBox(false);
        setCloseButton(false);
        setGifButton(false);
      }
    });

    // Focus send message input
    sendMessageRef.current.focus();
  }, []);

  // Scroll to bottom of chat when message is sent or received
  useEffect(() => {
    chatBox.current.addEventListener("DOMNodeInserted", (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth" });
    });
  }, [chatMessages]); // Run each time chatMessages is update

  // Close chat function
  const closeChat = () => {
    navigate("/");
    // Set ToggleContactInfoContext state to false
    toggleContactInfoContext.toggleContactInfoDispatch("hide");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <IconButton
          onClick={() => {
            toggleContactInfoContext.toggleContactInfoDispatch("toggle");
          }}
        >
          <Avatar src={chatUser?.photoURL} />
        </IconButton>

        <div className="chat-header-info">
          <h3>{chatUser?.fullname}</h3>
          {lastSeen && (
            <p>{`Last seen ${moment(lastSeen.toDate()).fromNow()}`}</p>
          )}
        </div>

        <div className="chat-header-right">
          <IconButton
            className={classes.icon}
            onClick={() => {
              searchMessageContext.searchMessageDispatch("toggle");
            }}
          >
            <SearchOutlinedIcon />
          </IconButton>

          <div className="chat-popover-container">
            <IconButton onClick={handleChatPopover} className={classes.icon}>
              <MoreVertRoundedIcon />
            </IconButton>
            {chatPopover && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className="chat-popover">
                  <h4
                    onClick={() => {
                      toggleContactInfoContext.toggleContactInfoDispatch(
                        "toggle"
                      );
                      handleChatPopover();
                    }}
                  >
                    Contact info
                  </h4>
                  <h4>Select messages</h4>
                  <h4 onClick={closeChat}>Close chat</h4>
                  <h4>Mute notifications</h4>
                  <h4>Disappearing messages</h4>
                  <h4>Clear messages</h4>
                  <h4>Delete chat</h4>
                </div>
              </ClickAwayListener>
            )}
          </div>
        </div>
      </div>

      <div
        // Conditional classname for chat body
        className={
          themeContext.theme === "light" ? "chat-body" : "chat-body-dark"
        }
        ref={chatBox}
      >
        <div className="chat-message-container">
          {chatMessages.map((message, id) => (
            <ChatMessage
              key={id}
              message={message.text}
              time={message.timestamp}
              sender={message.senderEmail}
              read={message.read}
            />
          ))}
        </div>
      </div>

      {emojiBox && (
        <EmojiPicker
          onEmojiClick={(event, emojiObject) => {
            setMessage(message + emojiObject.emoji);
            sendMessageRef.current.focus();
          }}
          groupNames={{
            smileys_people: "Smileys and People",
            animals_nature: "Animals & Nature",
            food_drink: "Food & Drink",
            travel_places: "Travel & Places",
            activities: "Activity",
            objects: "Objects",
            symbols: "Symbols",
            flags: "Flags",
            recently_used: "Recent",
          }}
          searchPlaceholder="Search Emoji"
          preload={true}
        />
      )}

      {block.length !== 0 ? (
        <div className="chat-footer-blocked">
          <p>Cant send message to a blocked contact {chatUser.email}</p>
        </div>
      ) : (
        <div className="chat-footer">
          {closeButton && (
            <IconButton
              className={classes.icon}
              onClick={() => {
                setEmojiBox(!emojiBox);
                setCloseButton(!closeButton);
                setGifButton(!gifButton);
                sendMessageRef.current.focus();
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            className={classes.icon}
            onClick={() => {
              setEmojiBox(true);
              setCloseButton(true);
              setGifButton(true);
              sendMessageRef.current.focus();
            }}
          >
            <InsertEmoticonOutlinedIcon />
          </IconButton>

          {gifButton && (
            <IconButton className={classes.icon}>
              <GifBoxOutlinedIcon />
            </IconButton>
          )}

          {/* <IconButton className={classes.icon}>
            <AttachFileOutlinedIcon />
          </IconButton> */}
          <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </Box>

          <form>
            <input
              placeholder="Type a message"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              ref={sendMessageRef}
            />
            <button type="submit" onClick={sendMessage}>
              Send Message
            </button>
          </form>

          <IconButton className={classes.icon}>
            <MicOutlinedIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Chat;

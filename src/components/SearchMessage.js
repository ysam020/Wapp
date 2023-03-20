import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../styles/search-messages.css";
import { SearchMessageContext } from "../contexts/Context";
import { IconButton } from "@material-ui/core";
import * as Icons from "./Icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import db from "../firebase";
import { UserContext } from "../contexts/Context";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696a0",
    },
  })
);

function SearchMessage(props) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator

  // MUI Styles
  const classes = useStyles();

  // Contexts
  const searchMessageContext = useContext(SearchMessageContext);
  const currentUser = useContext(UserContext);

  // useState
  const [searchedMessage, setSearchedMessage] = useState([]);
  const [searchedMessageInput, setSearchedMessageInput] = useState("");

  // Ref
  const searchMessagesRef = useRef();

  var senderMessageCollectionRef = db
    .collection("chats")
    .doc(currentUser.email)
    .collection("messages");

  // Get chats from database
  const getMessages = useCallback(() => {
    senderMessageCollectionRef
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let messages = snapshot.docs.map((doc) => doc.data());

        let newMessage = messages.filter(
          (message) =>
            message.senderEmail === (currentUser.email && props.emailId) ||
            message.receiverEmail === (currentUser.email && props.emailId)
        );

        setSearchedMessage(
          newMessage.filter((searchTerm) => {
            if (searchedMessageInput) {
              if (searchTerm.text.includes(searchedMessageInput)) {
                return searchTerm;
              }
            }
            return false;
          })
        );
      });
    // eslint-disable-next-line
  }, [searchedMessageInput]);

  useEffect(() => {
    searchMessagesRef.current.focus();

    getMessages();

    // eslint-disable-next-line
  }, [searchedMessageInput, props.emailId]);

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          aria-label="close"
          className={classes.icon}
          onClick={() => searchMessageContext.searchMessageDispatch("toggle")}
        >
          <Icons.CloseRoundedIcon />
        </IconButton>

        <h3>Search messages</h3>
      </div>

      <div className="search-messages-body">
        <div className="search-messages-input-container">
          <IconButton
            aria-label="search"
            className={classes.icon}
            onClick={() => searchMessagesRef.current.focus()}
          >
            <Icons.SearchOutlinedIcon />
          </IconButton>
          <input
            placeholder="Search messages"
            value={searchedMessageInput}
            onChange={(e) => setSearchedMessageInput(e.target.value)}
            ref={searchMessagesRef}
          />
        </div>

        {searchedMessage.map((values, id) => {
          const { text, timestamp } = values;
          return (
            <div key={id} className="searched-message-container">
              <span>{timestamp.toDate().toLocaleDateString()}</span>
              {text.match(urlPattern) ? (
                <a href={text} target="blank">
                  {text}
                </a>
              ) : (
                <p>{text}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(SearchMessage);

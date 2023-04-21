import React from "react";
import "../styles/search-messages.css";
import { IconButton } from "@material-ui/core";
import * as Icons from "./Icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useContexts from "../customHooks/contexts";
import { urlPattern } from "../assets/data/urlPattern";
import useGetSearchedMessages from "../customHooks/getSearchedMessages";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696a0",
    },
  })
);

function SearchMessage(props) {
  // MUI Styles
  const classes = useStyles();

  // Contexts
  const { searchMessageDispatch } = useContexts();

  const {
    searchedMessage,
    searchedMessageInput,
    setSearchedMessageInput,
    searchMessagesRef,
  } = useGetSearchedMessages();

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          aria-label="close"
          className={classes.icon}
          onClick={() => searchMessageDispatch("toggle")}
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

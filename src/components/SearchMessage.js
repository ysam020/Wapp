import React from "react";
// Styles
import "../styles/search-messages.css";
// Components
import * as Icons from "./Icons";
import { IconButton } from "@material-ui/core";
// Assets
import { urlPattern } from "../assets/data/urlPattern";
// Custom hooks
import useGetSearchedMessages from "../customHooks/getSearchedMessages";

///////////////////////////////////////////////////////////////////
function SearchMessage(props) {
  // Custom hooks
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
          onClick={props.toggleDrawer("searchMessage", false)}
        >
          <Icons.CloseRoundedIcon color="primary" />
        </IconButton>

        <h3>Search messages</h3>
      </div>

      <div className="search-messages-body">
        <div className="search-messages-input-container">
          <IconButton
            aria-label="search"
            onClick={() => searchMessagesRef.current.focus()}
          >
            <Icons.SearchOutlinedIcon color="primary" />
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

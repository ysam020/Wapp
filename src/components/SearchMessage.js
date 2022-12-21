import React, { useContext, useEffect, useRef } from "react";
import "../styles/search-messages.css";
import { SearchMessageContext } from "../contexts/Context";
import { IconButton } from "@material-ui/core";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      color: "#8696a0",
    },
  })
);

function SearchMessage({ searchedMessage, searchInput, setSearchInput }) {
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

  // Ref
  const searchMessagesRef = useRef();

  useEffect(() => {
    searchMessagesRef.current.focus();
  });

  return (
    <div className="sidebar-panel-right">
      <div className="sidebar-panel-right-header">
        <IconButton
          className={classes.icon}
          onClick={() => searchMessageContext.searchMessageDispatch("toggle")}
        >
          <CloseRoundedIcon />
        </IconButton>

        <h3>Search messages</h3>
      </div>

      <div className="search-messages-body">
        <div className="search-messages-input-container">
          <IconButton
            className={classes.icon}
            onClick={() => searchMessagesRef.current.focus()}
          >
            <SearchOutlinedIcon />
          </IconButton>
          <input
            placeholder="Search messages"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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

export default SearchMessage;

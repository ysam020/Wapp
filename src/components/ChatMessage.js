// import React from "react";
// import { auth } from "../firebase";

// function ChatMessage({ message, time, sender }) {
//   const urlPattern = new RegExp(
//     "^(https?:\\/\\/)?" + // validate protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
//       "(\\#[-a-z\\d_]*)?$",
//     "i"
//   ); // validate fragment locator

//   return (
//     <>
//       {/* Check if message is a link */}
//       {message.match(urlPattern) ? (
//         <a
//           href={message}
//           target="blank"
//           className={
//             sender === auth?.currentUser?.email
//               ? "chat-message chat-message-sent"
//               : "chat-message chat-message-received"
//           } // If sender email matches email of current user, className will be chat-message-sent, otherwise chat-message-received
//         >
//           {message}
//           <span className="chat-timestamp">
//             {new Date(time.toDate()).toLocaleTimeString()}
//           </span>
//         </a>
//       ) : (
//         <p
//           className={
//             sender === auth?.currentUser?.email
//               ? "chat-message chat-message-sent"
//               : "chat-message chat-message-received"
//           } // If sender email matches email of current user, className will be chat-message-sent, otherwise chat-message-received
//         >
//           {message}
//           <span className="chat-timestamp">
//             {new Date(time.toDate()).toLocaleTimeString()}
//           </span>
//         </p>
//       )}
//     </>
//   );
// }

// export default ChatMessage;

import React from "react";
import { auth } from "../firebase";

function ChatMessage({ message, time, sender }) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator

  return (
    <>
      {/* Check if message is a link */}
      <div
        className={
          sender === auth?.currentUser?.email
            ? "chat-message chat-message-sent"
            : "chat-message chat-message-received"
        }
      >
        {message.match(urlPattern) ? (
          <>
            <a href={message} target="blank">
              {message}
            </a>
            <span className="chat-timestamp">
              {new Date(time.toDate()).toLocaleTimeString()}
            </span>
          </>
        ) : (
          <>
            <p>{message}</p>
            <span className="chat-timestamp">
              {new Date(time.toDate()).toLocaleTimeString()}
            </span>
          </>
        )}
      </div>
    </>
  );
}

export default ChatMessage;

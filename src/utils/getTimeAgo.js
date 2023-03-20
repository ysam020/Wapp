// Classify timestamp based on time ago
export function getTimeAgo(index, getPreviousMessageDate) {
  const currentDate = new Date();

  if (getPreviousMessageDate(index) !== null) {
    var messageDate = getPreviousMessageDate(index);

    var dateArray = messageDate.split("/");
    dateArray.reverse();

    var newMessageDate = new Date(dateArray.join("/"));
  }

  var diffTime = currentDate - newMessageDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  if (diffDays < 1) {
    return "Today";
  } else if (diffDays < 2) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return newMessageDate.toLocaleString("default", { weekday: "long" });
  } else {
    return newMessageDate.toLocaleDateString();
  }
}

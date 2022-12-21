export const reducer = (state, action) => {
  switch (action) {
    case "toggle":
      return !state;
    case "show":
      return true;
    case "hide":
      return false;
    default:
      return state;
  }
};

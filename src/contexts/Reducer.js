export const reducer = (state, action) => {
  switch (action) {
    case "toggle":
      return !state;
    case "hide":
      return false;
    default:
      return state;
  }
};

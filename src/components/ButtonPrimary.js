import React from "react";

function ButtonPrimary({ children }) {
  return <button className="btn-primary">{children}</button>;
}

export default React.memo(ButtonPrimary);

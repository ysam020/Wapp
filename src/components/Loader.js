import React from "react";
import "../styles/loader.css";
import BarLoader from "react-spinners/BarLoader";

function Loader(loading) {
  return (
    <div className="loader">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/640px-WhatsApp.svg.png"
        alt=""
        height={150}
      />
      <BarLoader
        className="bar-loader"
        color="#008069"
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.7}
      />
      <h3>Wapp</h3>
    </div>
  );
}

export default React.memo(Loader);

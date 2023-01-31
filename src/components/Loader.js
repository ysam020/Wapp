import React from "react";
import "../styles/loader.css";
import BarLoader from "react-spinners/BarLoader";
import loaderImg from "../assets/images/WhatsApp.svg.webp";

function Loader(props) {
  return (
    <div className="loader">
      <img src={loaderImg} alt="loader-img" height={150} />

      <BarLoader
        className="bar-loader"
        color="#008069"
        loading={props.loading}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.7}
      />
      <h3>Wapp</h3>
    </div>
  );
}

export default React.memo(Loader);

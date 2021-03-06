import React from "react";

import "./Backdrop.scss";

const Backdrop = ({ className, show, onClick, ...otherProps }) => {
  return (
    <div onClick={onClick} className={`backdrop ${show && "backdrop-on"}`}>
      {otherProps.children}
    </div>
  );
};

export default Backdrop;

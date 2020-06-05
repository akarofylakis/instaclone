import React from "react";
import { Link } from "react-router-dom";

import "./Logo.scss";

const Logo = () => {
  return (
    <div className="leftNav__logo-container">
      <Link to="/">
        <div className="leftNav__logo-image"></div>
      </Link>
    </div>
  );
};

export default React.memo(Logo);

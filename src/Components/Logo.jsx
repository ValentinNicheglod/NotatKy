import React from 'react';

const Logo = () => (
  <div className="main-logo h-100">
    <h1 className="login-title unselectable h-100" id="white-col">
      <img
        src="logos/logo-wo-bg.png"
        alt="logo"
        width="10vh"
        height="10vh"
        className="logo-nav"
        draggable="false"
        style={{ pointerEvents: 'none' }}
      />
      NotatKy
    </h1>
  </div>
);

export default Logo;

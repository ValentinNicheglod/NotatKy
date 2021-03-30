import React from 'react';

const Logo = () => (
  <div className="main-logo">
    <h1 className="login-title unselectable" id="white-col">
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

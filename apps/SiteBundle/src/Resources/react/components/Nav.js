import React from 'react';

import NavLink from './../utils/NavLink';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header id="Nav">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button id="toggle-menu" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <a id="home" className="navbar-brand m-auto mr-lg-4" href="javascript:void(0)">inkrest</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li id="history" className="nav-item active">
                <NavLink to="/products">
                  <div>
                    <span>Products</span>
                  </div>
                </NavLink>
              </li>
              <li id="gallery" className="nav-item">
                <NavLink to="/account">
                  <button className="btn btn-white fadein">
                    <span>Log in / Sign up</span>
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

module.exports = Nav;

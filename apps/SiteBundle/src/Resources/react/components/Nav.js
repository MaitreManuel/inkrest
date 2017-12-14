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
          <NavLink to="/" id="home" className="navbar-brand m-auto mr-lg-4">
              inkrest
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li id="history" className="nav-item">
                <NavLink to="/products" className="nav-link fadein">
                  Products
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-lg-auto">
              <li className="nav-item">
                <NavLink to="/basket" className="nav-link fadein">
                  <i className="icon-basket icons"></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/account" className="btn btn-white fadein">
                  Log in / Sign up
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
import React from 'react';

import NavLink from './../utils/NavLink';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email      : '',
        password   : '',
      },
    };
  }

  connection() {

  }

  updateUser(event) {
    var user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({user: user});
  }

  render() {
    var logged = localStorage.getItem('user_token') ? true : false;
    // mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,

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
              <li className="nav-item">
                <NavLink to="/products" className="nav-link fadein">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/history" className="nav-link fadein">
                  Histoire
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/erreur" className="nav-link fadein">
                  Page erreur
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ml-lg-auto">
              <li className="nav-item">
                <NavLink to="/basket" className="nav-link fadein mr-3" style={{marginTop: '0.4em'}}>
                  <i className="icon-basket icons fa-2x"></i>
                </NavLink>
              </li>
              { logged === false &&
                <li id="login" className="nav-link">
                  <a href='javascript:void(0)' className="nav-link fadein">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </a>
                  <div id="login-content">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-input mb-3">
                            <label htmlFor="company">E-mail</label>
                            <input type="text" className="form-control" name="lemail" placeholder="john.doe@exemple.fr" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-input mb-4">
                            <label htmlFor="company">Mot de passe</label>
                            <input type="password" className="form-control" name="password" placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-input text-center mb-4">
                            <a href="javascript:void(0)" className="btn btn-black fadein">Connexion</a>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-input text-center">
                            <NavLink to='/register' className="fadein">
                              Pas de compte ? Inscrivez-vous !
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              }
              { logged === true &&
                <li id="login" className="nav-link">
                  <NavLink to='/account' className="nav-link fadein">
                    <i className="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
                  </NavLink>
                  <div id="login-content">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12">
                          Connecté !
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              }
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Nav;

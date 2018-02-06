import React from 'react';
import { NavLink } from 'react-router-dom';
import 'whatwg-fetch';
import './../../config.js';
import './../../assets/js/functions.js';

const toggle_menu = (trigger) => {
  var this_class = 'open',
    toggle = document.getElementById('toggle-menu'),
    header = document.querySelector('header#Nav');

  toggle.classList.toggle(this_class);
  header.classList.toggle(this_class);

  if (toggle.classList.contains(this_class) && trigger === 'ort_chg') {
    toggle.classList.toggle(this_class);
  }
};

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.connection = this.connection.bind(this);
    this.deconnection = this.deconnection.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      logged: localStorage.getItem('token') != undefined ? true : false,
      user: {
        mail       : '',
        password   : '',
      },
    };
  }

  componentDidUpdate() {
    init_navlogin(); // eslint-disable-line no-undef
  }

  componentDidMount() {
    init_navlogin(); // eslint-disable-line no-undef
  }

  connection() {
    var me = this,
      user = me.state.user,
      api = API(), // eslint-disable-line no-undef
      params = '',
      data = '',
      mail = document.querySelector('input[name=mail]'),
      password = document.querySelector('input[name=password]');

    if(mail.classList.contains('input-error')) { mail.classList.remove('input-error'); }
    if(password.classList.contains('input-error')) { password.classList.remove('input-error'); }
    if(!user.mail && !user.password) {
      mail.classList.add('input-error');
      password.classList.add('input-error');
    } else if(!user.mail) {
      mail.classList.add('input-error');
    } else if(!user.password) {
      password.classList.add('input-error');
    } else {
      params = {
        mail: user.mail,
        password: user.password
      };
      data = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');

      fetch(api.user.connect, {
        headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
        method: 'POST',
        body: data,
      })
        .then((response) => response.json())
        .then((response) => {
          if(response.status === 'success') {
            localStorage.setItem('firstname', response.array.firstname);
            localStorage.setItem('lastname', response.array.lastname);
            localStorage.setItem('mail', response.array.mail);
            localStorage.setItem('token', response.array.token);
            me.setState({ logged: true });
          }
        });
    }
  }

  deconnection() {
    var me = this,
      api = API(), // eslint-disable-line no-undef
      params = '',
      data = '';

    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('mail');
    localStorage.removeItem('token');

    params = {
      mail: localStorage.getItem('mail')
    };
    data = Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    fetch(api.user.disconnect, {
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.status === 'success') {

          me.setState({ logged: false });
        }
      });
  }

  updateUser(event) {
    var user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user: user });
  }

  render() {
    var logged = this.state.logged,
      firstname = localStorage.getItem('firstname'),
      lastname = localStorage.getItem('lastname');
    // mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false,

    return (
      <header id="Nav" className="mb-4">
        <nav className="navbar navbar-expand-lg navbar-dark custom-nav">
          <button onClick={ () => toggle_menu() } id="toggle-menu" className="navbar-toggler" type="button" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="scene">
            <div className="rocket">
              <div className="rocket-body">
                <div className="fin-top"></div>
                <div className="fin-bottom"></div>
                <div className="faya"></div>
                <div className="wastes">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          <NavLink to="/" id="home" className="navbar-brand m-auto mr-lg-4">
            <span>inkrest</span>
          </NavLink>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/products" className="nav-link fadein" activeClassName="active">
                  Catalogue
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/creation" className="nav-link fadein" activeClassName="active">
                  Création
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/history" className="nav-link fadein" activeClassName="active">
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
                  <i className="icon-basket fa-2x"></i>
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
                            <input onInput={ this.updateUser } type="mail" className="form-control" name="mail" placeholder="john.doe@exemple.fr" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-input mb-4">
                            <label htmlFor="company">Mot de passe</label>
                            <input onInput={ this.updateUser } type="password" className="form-control" name="password" placeholder=""/>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center mb-4">
                          <a onClick={ this.connection } href="javascript:void(0)" className="btn btn-violet fadein">Connexion</a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <NavLink to='/register' className="fadein">
                            Pas de compte ? Inscrivez-vous !
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              }
              { logged === true &&
                <li id="login" className="nav-link">
                  <NavLink to='/account' className="nav-link fadein">
                    <i className="fa fa-user-circle-o fa-2x green" aria-hidden="true"></i>
                  </NavLink>
                  <div id="login-content">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12 mb-4">
                          Bonjour, { firstname } { lastname } !
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center mb-3">
                          <NavLink to='/account' className="btn btn-violet fadein">
                            Mon compte
                          </NavLink>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center">
                          <a onClick={ this.deconnection } href="javascript:void(0)" className="red fadein">Deconnexion</a>
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

import React from 'react';
import { NavLink } from 'react-router-dom';

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const bg = document.querySelector('#background'),
      waves = document.querySelector('#waves');

    bg.classList.remove('general');
    bg.classList.add('notfound');

    document.querySelector('body').removeChild(waves);
  }

  quitError() {
    const bg = document.querySelector('#background'),
      canv = document.createElement('canvas');

    canv.id = 'waves';

    bg.classList.remove('notfound');
    bg.classList.add('general');
    document.body.appendChild(canv);
    waves(); // eslint-disable-line no-undef
  }

  render() {
    return (
      <section id="NotFound">
        <div className="title-404">
          <div className="text-slideup">
            <h1 className="first">404 erreur</h1>
          </div>
          <div className="text-slideup">
            <h3 className="second">Êtes-vous perdu ?</h3>
          </div>
          <NavLink onClick={ this.quitError } to="/" className="btn btn-transparent fadein">
            <span>{ 'Page d\'accueil' }</span>
          </NavLink>
        </div>
        <div className="lost-planet-box">
          <div className="space">
            <div className="star star-1"></div>
            <div className="star star-2"></div>
            <div className="star star-3"></div>
            <div className="ship">
              <div className="ship-rotate">
                <div className="pod"></div>
                <div className="fuselage"></div>
              </div>
            </div>
            <div className="wrapper-moon">
              <div className="moon">
                <div className="crater moon_crater"></div>
                <div className="crater2 moon_crater"></div>
              </div>
            </div>
            <div className="lost-planet">
              <div className="tentacle"></div>
              <div className="flag">
                <div className="small-tentacle"></div>
              </div>
              <div data-clip="50% 0 0 0" className="ring-before"></div>
              <div data-clip="50% 0 0 0" className="ring-bigger-before"></div>
              <div className="planet">
                <div className="surface"></div>
                <div className="crater1"></div>
                <div className="crater2"></div>
                <div className="crater3"></div>
              </div>
              <div data-clip="0 0 50% 0" className="ring-after"></div>
              <div data-clip="0 0 50% 0" className="ring-bigger-after"></div>
            </div>
          </div>
        </div>
        <div className="footer-404">
          <div className="text-slideup">
            <h4 className="third">{ 'Vous n\'êtes pas seuls...' }</h4>
          </div>
        </div>
      </section>
    );
  }
}

export default NotFound;

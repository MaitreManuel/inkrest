import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Home">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>Home</h1>
              <p>Bienvenue sur inkrest, faites vos propres modèles où utilisez les nôtres !</p>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12">
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default Home;

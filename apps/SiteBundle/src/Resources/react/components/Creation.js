import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Creaation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Creaation">
        <Nav/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1>Création</h1>
              <p>Importez vos créations puis choisissez les options d{'\''}impressions que vous souhaitez !</p>
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

export default Creaation;
import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Basket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Basket" className="Root">
        <Nav/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1>Basket</h1>
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

export default Basket;

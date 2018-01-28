import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Product">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>Catalogue</h1>
              <p>Découvrez tous nos produits et ceux de la communauté !</p>
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

export default Product;

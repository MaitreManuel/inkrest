import React from 'react';

import Nav from './Nav';

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Product">
        <Nav/>
        <h1>Product</h1>
      </section>
    );
  }
}

module.exports = Product;

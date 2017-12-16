import React from 'react';

import Nav from './Nav';

class Basket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Basket">
        <Nav/>
        <h1>Basket</h1>
      </section>
    );
  }
}

module.exports = Basket;

import React from 'react';

import Nav from './Nav';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Home">
        <Nav />
      </section>
    );
  }
}

module.exports = Home;
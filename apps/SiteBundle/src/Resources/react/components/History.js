import React from 'react';

import Nav from './Nav';

class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="History">
        <Nav/>
        <h1>History</h1>
      </section>
    );
  }
}

module.exports = History;

import React from 'react';

import Nav from './Nav';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Home">
        <Nav/>
        <h1>Home</h1>
      </section>
    );
  }
}

export default Home;

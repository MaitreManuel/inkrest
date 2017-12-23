import React from 'react';

import Nav from './Nav';

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Account">
        <Nav/>
        <h1>Account</h1>
      </section>
    );
  }
}

export default Account;

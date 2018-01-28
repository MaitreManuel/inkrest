import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Account">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>Account</h1>
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

export default Account;

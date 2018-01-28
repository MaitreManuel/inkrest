import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Creation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="Creation">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>Création</h1>
              <p>Importez vos modèles et publiez les ! Faites découvrir vos plus beaux chef-d{'\''}œuvres !</p>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12">
              <div className="row justify-content-end">
                <div className="col-6 text-right">
                  <a href="javascript:void(0);" className="btn btn-transparent fadein">
                    <i className="icon-cloud-upload"></i>
                    <span> Importer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default Creation;

import React from 'react';
import { NavLink } from 'react-router-dom';
import 'whatwg-fetch';
import './../../config.js';

import Footer from './Footer';
import Nav from './Nav';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      last_product       : [],
    };
  }

  componentWillMount() {
    const me = this;
    let api = API(); // eslint-disable-line no-undef

    fetch(api.product.last, {
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        let last_products = [];

        for (let i = 0; i < response.length; i++) {
          let last_product = response[i];

          last_products.push(
            <div className="col-12 col-lg-4" key={ '/product/'+ last_product.id }>
              <NavLink to={ '/product/'+ last_product.id }>
                <div className="row preview-product fadein">
                  <div className="col-12">
                    <div className="img">
                      { Object.keys(last_product).length >= 0 &&
                      <img src={ last_product.image } alt="Preview last product" />
                      }
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mt-4 text-center infos">
                      <p>{ last_product.name }</p>
                      <p>{ last_product.author }</p>
                      <p className="desc">{ last_product.description }</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          );
        }
        me.setState({ last_product: last_products });
      });
  }

  render() {
    const me = this;
    let last_product = me.state.last_product;

    return (
      <section id="Home">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>inkrest</h1>
              <p>Bienvenue sur inkrest, faites vos propres modèles où utilisez les nôtres !</p>
            </div>
          </div>
          <div className="row justify-content-center blockoverflow">
            <div className="col-12">
              <div className="row mb-5">
                <div className="col-12">
                  <div className="p-5">
                    <h4>Dernière publication</h4>
                    <p className="mt-4">
                      Voici la dernière publication en date de la part d{'\''}un membre de la communauté !
                    </p>
                    <div className="row mt-5">
                      { last_product }
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <NavLink to="/products" className="btn btn-white fadein">
                    Voir plus de produits
                  </NavLink>
                </div>
              </div>
              <div className="row my-5">
                <div className="col-12 col-lg-6">
                  <img src="" alt="Creation ad"/>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="p-5">
                    <h4>Propulsez-vous et ajoutez votre création !</h4>
                    <p className="mt-4">
                      Dans cette section, vous allez être guidé étape par étape pour publier vos créations et ainsi les proposer à notre communauté !
                      Pas d{'\''}inquiétudes, vos créations sont protégées par vos droits d{'\''}auteurs et notre législation !
                    </p>
                    <p className="mt-4">Lancez-vous !</p>
                    <div className="text-center mt-5">
                      <NavLink to="/creation" className="btn btn-white fadein">
                        Ajouter ma création
                      </NavLink>
                    </div>
                  </div>
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

export default Home;

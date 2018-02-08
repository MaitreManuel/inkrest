import React from 'react';
import { NavLink } from 'react-router-dom';
import 'whatwg-fetch';
import './../../config.js';

import Footer from './Footer';
import Nav from './Nav';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products    : [],
    };
  }

  componentWillMount() {
    const me = this;
    let api = API(); // eslint-disable-line no-undef

    fetch(api.product.all, {
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        let products = [];

        Object.keys(response).map(i => {
          let product = response[i];



          products.push(
            <div className="col-12 col-lg-4" key={ '/product/'+ product.id }>
              <NavLink to={ '/product/'+ product.id }>
                <div className="row preview-product fadein">
                  <div className="col-12">
                    <div className="img">
                      <img src={ product.image } alt="Preview last product" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mt-4 text-center infos">
                      <p>{ product.name }</p>
                      <p>{ product.author }</p>
                      <p className="desc">{ product.description }</p>
                    </div>
                  </div>
                </div>
              </NavLink>
            </div>
          );
        });

        me.setState({ products: products });
      });
  }

  render() {
    const me = this;
    let products = me.state.products;

    return (
      <section id="Products">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>Catalogue</h1>
              <p>Découvrez tous nos produits et ceux de la communauté !</p>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12 mt-5">
              <div className="row">
                { products }
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default Products;

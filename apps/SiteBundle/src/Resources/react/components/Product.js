import React from 'react';
import 'whatwg-fetch';
import './../../config.js';

import Footer from './Footer';
import Nav from './Nav';
import swal from 'sweetalert2';

class Product extends React.Component {
  buyProduct() {
    swal({
      title: 'Acheter "'+ this.state.product[0].name +'"',
      html:
      '<div class="container-fluid text-left">' +
        '<div class="row justify-content-center my-5">' +
        '<div class="col-12">' +
          '<div class="form-input">' +
            '<label class="mb-3">Indiquer la quantité</label>' +
            '<input id="mail" type="text" class="form-control" name="mail" placeholder="Ex: 5" />' +
          '</div>' +
        '</div>' +
        '</div>' +
        '<div class="row justify-content-center my-5">' +
          '<div class="col-12">' +
            '<div class="form-input">' +
              '<label for="company" class="mb-3">Indiquer vos ancres (remplacer les valeurs apres le "=")</label>' +
              '<textarea id="message" class="form-control" name="message" placeholder="Vos ancres ici"></textarea>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>'
      ,
      showCancelButton: true,
      confirmButtonText: '✔ Envoyer',
      cancelButtonText: 'Retour'
    }).then(e => {
      if(e.value && document.querySelector('#message').value.length > 0 && document.querySelector('#mail').value.length > 0) {
        swal({
          title: 'Article mise au panier',
          text: 'Nous avons bien mis votre article dans le panier !',
          type: 'success',
          confirmButtonText: '✔ Ok',
        });
      }
    });
  }

  constructor(props) {
    super(props);

    this.buyProduct = this.buyProduct.bind(this);

    this.state = {
      product    : [],
    };
  }

  componentWillMount() {
    const me = this;
    let api = API(), // eslint-disable-line no-undef
      params = window.location.pathname.split('/'),
      id = params[params.length - 1];

    fetch(api.product.one + id, {
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
      method: 'GET',
    }).then((response) => response.json())
      .then((response) => {
        if(response.length > 0) {
          me.setState({ product: response });
        } else {
          window.location.href = window.location.origin +'/error';
        }
      });
  }

  render() {
    let product = this.state.product.length > 0 ? this.state.product[0] : '',
      format, type = ' ',
      formats = this.state.product.length ? this.state.product[0].format : '';

    if(product !== '') {
      format = product.format.length > 3 ? product.format.split(',') : product.format;
      if(typeof format === 'object') {
        format = format[0];
      }
      if(format === 'CB') {
        type = 'Carte de visite';
      }
      if(format === '2A0') {
        type = 'Grande affiche';
      }
      if(format === 'A0') {
        type = 'Affiche';
      }
      if(format === 'A1') {
        type = 'Petite affiche';
      }
      if(format === 'A2') {
        type = 'Très grande feuille';
      }
      if(format === 'A3') {
        type = 'Grande feuille';
      }
      if(format === 'A4') {
        type = 'Feuille standarde';
      }
      if(format === 'A5') {
        type = 'Petite feuille';
      }
      if(format === 'A6') {
        type = 'Carte postale';
      }
      if(format === 'A7') {
        type = 'Carte de visite réduite';
      }
      if(format === 'A8') {
        type = 'Petite carte de visite';
      }
      if(format === 'A10') {
        type = 'Bout de papier';
      }
    }

    return (
      <section id="Product">
        <Nav/>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>{ product.name }</h1>
              <p>
                { type }
              </p>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-lg-6 mt-5">
                  <div className="img-product">
                    <img src={ product.image } alt="Image produit" />
                  </div>
                </div>
                <div className="col-12 col-lg-6 mt-5">
                  <div className="p-5">
                    <h4>Nom produit :</h4>
                    <p>{ product.name }</p>
                    <h5>Description :</h5>
                    <p>{ product.description }</p>
                    <h5>Auteur :</h5>
                    <p>{ product.author }</p>
                    <h5>Ancre :</h5>
                    <p>{ product.anchors }</p>
                    <h5>Formats disponibles :</h5>
                    <p>
                      { formats }
                    </p>
                    <h5>Prix : 10€ / l'affiche</h5>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-6 text-center">
                  <a onClick={ this.buyProduct } href="javascript:void(0);" className="btn btn-white fadein">Acheter</a>
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

export default Product;

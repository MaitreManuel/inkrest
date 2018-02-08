import React from 'react';
import swal from 'sweetalert2';
import 'whatwg-fetch';
import './../../config.js';

import Footer from './Footer';
import Nav from './Nav';

class Creation extends React.Component {
  constructor(props) {
    super(props);

    this.changeStep = this.changeStep.bind(this);
    this.importClick = this.importClick.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateName = this.updateName.bind(this);

    this.state = {
      anchors       : '',
      description   : '',
      format        : [],
      formatAll     : '',
      image         : '',
      name          : '',
    };
  }

  componentWillMount() {
    const me = this;
    let api = API(); // eslint-disable-line no-undef

    fetch(api.format, {
      headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        let formatAll = '';

        for (let i = 1  ; i < Object.keys(response).length + 1; i++ ) {
          let format = response[i];

          formatAll = formatAll.concat(
            '<div class="col-7">' +
              '<div class="form-check">' +
                '<input data-name="'+ format.name +'" type="checkbox" class="form-check-input" id="'+ format.id +'-'+ format.name +'" />' +
                '<label class="form-check-label" for="'+ format.id +'-'+ format.name +'">'+ format.name +' ('+ format.dimensions +')</label>' +
              '</div>' +
            '</div>'
          );
        }

        me.setState({ formatAll: formatAll });
      });
  }

  changeStep(event, step) {
    const me = this;

    const step_1 = (trigger) => {
      let image = '',
        step_1 = document.querySelector('.step_1');

      if(trigger === 'hide') {
        step_1.classList.add('d-none');
      } else if(trigger === 'show') {
        step_1.classList.remove('d-none');
        this.setState({ image: image });
      }

    };
    const step_1_5 = (trigger) => {
      let preview = document.querySelector('.end_step_1'),
        scene = document.querySelector('.scene_steps'),
        btn_import = document.querySelector('#btn-import');

      if(trigger === 'hide') {
        preview.classList.add('d-none');
        preview.querySelector('img').src = '';
        btn_import.classList.remove('d-none');
        scene.classList.remove('d-none');
      }
    };
    const step_2 = (trigger) => {
      let name = me.state.name,
        step_2 = document.querySelector('.step_2'),
        scene = document.querySelector('.scene_steps'),
        input = document.querySelector('input[name="name"');

      if(trigger === 'hide') {
        step_2.classList.add('d-none');
      } else if(trigger === 'show') {
        input.value = '';
        name = '';
        this.setState({ name: name });
        step_2.classList.remove('d-none');
        scene.classList.remove('d-none');
      } else if(trigger === 'show_without_wipe') {
        step_2.classList.remove('d-none');
        scene.classList.remove('d-none');
      }
    };
    const step_3 = (trigger) => {
      let description = me.state.description,
        step_3 = document.querySelector('.step_3'),
        textarea = document.querySelector('textarea[name="description"');

      if(trigger === 'hide') {
        step_3.classList.add('d-none');
      } else if(trigger === 'show') {
        textarea.value = '';
        description = '';
        this.setState({ description: description });
        step_3.classList.remove('d-none');
      } else if(trigger === 'show_without_wipe') {
        step_3.classList.remove('d-none');
      }
    };

    let name = me.state.name,
      description = me.state.description;

    if(step === 'back_to_1') {
      step_1('show');
      step_1_5('hide');
      step_2('hide');
      step_3('hide');
    } else if(step === 'back_to_2') {
      step_2('show');
      step_3('hide');
    } else if(step === 'back_to_3') {
      step_3('show');
    } else if(step === 'go_to_1.33') {
      me.importClick(event);
    } else if(step === 'go_to_1.66') {
      me.loadImage(event);
    } else if(step === 'go_to_2') {
      step_1('hide');
      step_2('show');
    } else if(step === 'go_to_3') {
      if(name.length < 3) {
        swal({
          title: 'Nom invalide ¯\\_(ツ)_/¯',
          text: 'Tu dois donner un nom valide à ta création pour pouvoir continuer !',
          type: 'error',
          confirmButtonText: '✔ Ok',
        });
      } else {
        step_2('hide');
        step_3('show');
        me.setState({ name : name });
      }
    } else if(step === 'go_to_4') {
      if(description.length < 50) {
        swal({
          title: 'Description invalide ¯\\_(ツ)_/¯',
          text: 'Tu dois donner une description valide à ta création pour pouvoir continuer !',
          type: 'error',
          confirmButtonText: '✔ Ok',
        });
      } else {
        let formatAll = me.state.formatAll;

        step_3('hide');
        me.setState({ format: [] });
        swal({
          title: 'Choisis tes formats',
          html: '<div id="formats" class="container-fluid text-left"><div class="row justify-content-center my-5">'+ formatAll +'</div></div>',
          showCancelButton: true,
          confirmButtonText: '✔ Valider',
          cancelButtonText: 'Retour'
        }).then(result => {
          const formats = document.querySelectorAll('input[type="checkbox"]:checked');

          if(result.dismiss === 'cancel') {
            step_3('show_without_wipe');
          } else if(formats.length < 1) {
            swal({
              title: 'Aucuns formats selectionnés ¯\\_(ツ)_/¯',
              text: 'Tu dois choisir au moins un format !',
              type: 'error',
              confirmButtonText: '✔ Ok',
            }).then(() => {
              me.changeStep(null, 'go_to_4');
            });
          } else {
            let formats_state = [];

            for(let i = 0; i < formats.length; i++) {
              let format = formats[i];

              formats_state.push(''+ format.getAttribute('data-name') +'');
            }
            me.setState({ format: formats_state });
            me.changeStep(null, 'go_to_5');
          }
        });
      }
    } else if(step === 'go_to_5') {
      swal({
        title: 'Choisis tes formats',
        html:
        '<div id="formats" class="container-fluid text-left">' +
          '<div id="preview-anchors" class="row justify-content-center my-3">' +
            '<div class="col-12">' +
              '<img src="'+ me.state.image +'" alt="Preview anchors" />' +
            '</div>' +
          '</div>' +
          '<div class="row justify-content-center my-5">' +
            '<div class="col-12">' +
              '<div class="form-input anchors">' +
                '<label for="company" class="mb-3">Indique les endroits de texte avec une description précise, nous nous chargerons du reste !</label>' +
                '<textarea id="anchors" class="form-control" name="description" placeholder="Ex: Le champs texte violet ou est écrit \'Décollage !\' est le titre, en dessous c\'est le sous-titre."></textarea>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>'
        ,
        showCancelButton: true,
        confirmButtonText: '✔ Valider',
        cancelButtonText: 'Retour'
      }).then(result => {
        const anchors = document.querySelector('#anchors');

        if(result.dismiss === 'cancel') {
          me.changeStep(null, 'go_to_4');
        } else if(anchors.value.length < 1) {
          swal({
            title: 'Aucunes ancres renseignées ¯\\_(ツ)_/¯',
            text: 'Tu dois fournir des ancres pour ta création !',
            type: 'error',
            confirmButtonText: '✔ Ok',
          }).then(() => {
            me.changeStep(null, 'go_to_5');
          });
        } else {
          me.setState({ anchors: anchors.value });
          me.changeStep(null, 'confirm');
        }
      });
    } else if(step === 'confirm') {
      swal({
        title: 'Choisis tes formats',
        html:
        '<div id="results" class="container-fluid text-center">' +
          '<div id="preview-anchors" class="row justify-content-center my-2">' +
            '<div class="col-12">' +
              '<img src="'+ me.state.image +'" alt="Preview anchors" />' +
            '</div>' +
          '</div>' +
          '<div class="row justify-content-center my-2">' +
            '<div class="col-12">' +
              '<p><strong>Nom :</strong></p>' +
              '<p>'+ me.state.name +'</p>' +
        '</div>' +
          '</div>' +
          '<div class="row justify-content-center my-2">' +
            '<div class="col-12">' +
              '<p><strong>Description :</strong></p>' +
              '<p>'+ me.state.description +'</p>' +
            '</div>' +
          '</div>' +
          '<div class="row justify-content-center my-2">' +
            '<div class="col-12">' +
              '<p><strong>Format :</strong></p>' +
              '<p>'+ me.state.format +'</p>' +
            '</div>' +
          '</div>' +
          '<div class="row justify-content-center my-2">' +
            '<div class="col-12">' +
              '<p><strong>Ancres :</strong></p>' +
              '<p>'+ me.state.anchors +'</p>' +
            '</div>' +
          '</div>' +
        '</div>'
        ,
        showCancelButton: true,
        confirmButtonText: '✔ Envoyer',
        cancelButtonText: 'Retour'
      }).then(result => {
        if(result.dismiss === 'cancel') {
          me.changeStep(null, 'go_to_5');
        } else {
          let api = API(), // eslint-disable-line no-undef
            params = {
              mail          : localStorage.getItem('mail'),
              token         : localStorage.getItem('token'),
              anchors       : me.state.anchors,
              description   : me.state.description,
              format        : me.state.format,
              image         : me.state.image,
              name          : me.state.name,
            },
            data = Object.keys(params).map((key) => {
              return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');

          fetch(api.creation, {
            headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'}),
            method: 'POST',
            body: data,
          })
            .then((response) => response.json())
            .then((response) => {
              if(response.status === 'error') {
                swal({
                  title: 'Vous n\'êtes pas connecté ¯\\_(ツ)_/¯',
                  text: 'Il faut recommencer si vous n\'êtes pas connecté !',
                  type: 'error',
                  confirmButtonText: '✔ Ok',
                }).then(() => {
                  window.location.reload();
                });
              } else {
                me.changeStep(null, 'back_to_1');
                me.setState({
                  anchors       : '',
                  description   : '',
                  format        : [],
                  formatAll     : '',
                  image         : '',
                  name          : '',
                });
                swal({
                  title: 'Terminé !',
                  text: 'Bravo vous avez bien importé votre création ! Vous allez être redirigé vers la page d\'accueil :)',
                  type: 'success',
                  confirmButtonText: '✔ Ok',
                }).then(() => {
                  window.location.href = 'http://inkrest.fr/';
                });
              }
            });
        }
      });
    }
  }

  importClick(event) {
    let file = event.currentTarget.querySelector('input[type="file"]');

    file.click();
  }

  loadImage(event) {
    const me = this;
    const getBase64 = (file) => {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        let image,
          preview = document.querySelector('.end_step_1'),
          scene = document.querySelector('.scene_steps'),
          btn_import = document.querySelector('#btn-import');

        image = reader.result;
        btn_import.classList.add('hide');
        scene.classList.add('hide');
        setTimeout(() => {
          btn_import.classList.add('d-none');
          scene.classList.add('d-none');
          btn_import.classList.remove('hide');
          scene.classList.remove('hide');
          preview.querySelector('img').src = reader.result;
          preview.classList.remove('d-none');
        }, 500);
        me.setState({ image: image });
      };
    };

    let file = event.currentTarget.querySelector('input[type="file"]');

    getBase64(file.files[0]);
  }

  updateDescription(event) {
    this.setState({ description: event.target.value });
  }

  updateName(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    const me = this,
      name = me.state.name,
      description = me.state.description;

    return (
      <section id="Creation">
        <Nav/>
        <div className="scene_steps">
          <div className="wrapper-rocket">
            <div className="rocket">
              <div className="rocket-body">
                <div className="fin-top"></div>
                <div className="fin-bottom"></div>
                <div className="faya"></div>
                <div className="wastes">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          <div id="earth_holder">
            <div id="earth_ball"></div>
            <div id="earth"></div>
          </div>
        </div>
        <div className="container-fluid blockheader">
          <div className="row">
            <div className="col-12">
              <h1>Création</h1>
              <p>Importez vos modèles et publiez les ! Faites découvrir vos plus beaux chef-d{'\''}œuvres !</p>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12 m-auto">
              <div className="row step_1">
                <div className="col-12 mb-5 text-center">
                  <a onClick={ (event) => this.changeStep(event, 'go_to_1.33') } onChange={ (event) => this.changeStep(event, 'go_to_1.66') } href="javascript:void(0);" id="btn-import" className="btn btn-violet fadein">
                    <input type="file"/>
                    <i className="icon-cloud-upload"></i>
                    <span> Importer une image</span>
                  </a>
                  <div className="end_step_1 d-none">
                    <img id="preview" className="" src="" alt="Aperçu import image"/>
                    <div className="control">
                      <a onClick={ (event) => this.changeStep(event, 'back_to_1') } href="javascript:void(0);" className="mx-4 cancel">
                        <i className="icon-close fa-3x"></i>
                      </a>
                      <a onClick={ (event) => this.changeStep(event, 'go_to_2') } href="javascript:void(0);" className="mx-4 valid">
                        <i className="icon-check fa-3x"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center d-none step_2">
                <div className="col-12 col-lg-5">
                  <div className="form-input">
                    <label htmlFor="company" className="mb-3">Nommez votre création ! <strong>({ name.length }/3 caractères minimum)</strong></label>
                    <input onInput={ this.updateName } type="text" className="form-control" name="name" placeholder="Ex: Fusée de l'espace (minimum 3 caractères)" />
                  </div>
                  <div className="mt-5 text-right">
                    <a onClick={ (event) => this.changeStep(event, 'back_to_1') } href="javascript:void(0);" className="btn btn-red fadein mr-2 mr-lg-3">Retour</a>
                    <a onClick={ (event) => this.changeStep(event, 'go_to_3') } href="javascript:void(0);" className="btn btn-green fadein ml-2 ml-lg-3">Valider</a>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center d-none step_3">
                <div className="col-12 col-lg-5">
                  <div className="form-input">
                    <label htmlFor="company" className="mb-3">Maintenant, donnez-lui une description ! <strong>({ description.length }/50 caractères minimum)</strong></label>
                    <textarea onInput={ this.updateDescription } className="form-control" name="description" placeholder="Ex: C'est une belle fusée qui décolle avec panache !" />
                  </div>
                  <div className="mt-5 text-right">
                    <a onClick={ (event) => this.changeStep(event, 'back_to_2') } href="javascript:void(0);" className="btn btn-red fadein mr-2 mr-lg-3">Retour</a>
                    <a onClick={ (event) => this.changeStep(event, 'go_to_4') } href="javascript:void(0);" className="btn btn-green fadein ml-2 ml-lg-3">Valider</a>
                  </div>
                </div>
              </div>
              <div className="row d-none confirm_creation">
                <div className="col-12">
                  <p>Récapitulatif</p>
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

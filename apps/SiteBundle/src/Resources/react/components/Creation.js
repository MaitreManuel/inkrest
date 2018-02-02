import React from 'react';

import Footer from './Footer';
import Nav from './Nav';

class Creation extends React.Component {
  cancelImport() {
    let preview = document.querySelector('.end_step_1'),
      scene = document.querySelector('.scene_steps'),
      btn_import = document.querySelector('#btn-import');

    preview.classList.add('d-none');
    preview.querySelector('img').src = '';
    btn_import.classList.remove('d-none');
    scene.classList.remove('d-none');
  }

  constructor(props) {
    super(props);

    this.importChange = this.importChange.bind(this);
    this.importClick = this.importClick.bind(this);
  }

  importChange(event) {
    const getBase64 = (file) => {
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        let preview = document.querySelector('.end_step_1'),
          scene = document.querySelector('.scene_steps'),
          btn_import = document.querySelector('#btn-import');

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
      };
    };
    let file = event.currentTarget.querySelector('input[type="file"]');

    getBase64(file.files[0]);
  }

  importClick(event) {
    let file = event.currentTarget.querySelector('input[type="file"]');

    file.click();
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
            <div className="col-12 m-auto">
              <div className="row step_1">
                <div className="col-12 mb-5 text-center">
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
                  <a onClick={ this.importClick } onChange={ this.importChange } href="javascript:void(0);" id="btn-import" className="btn btn-violet fadein">
                    <input type="file"/>
                    <i className="icon-cloud-upload"></i>
                    <span> Importer une image</span>
                  </a>
                  <div className="end_step_1 d-none">
                    <img id="preview" className="" src="" alt="Aperçu import image"/>
                    <div className="control">
                      <a onClick={ this.cancelImport } href="javascript:void(0);" className="mx-4 cancel">
                        <i className="icon-close fa-3x"></i>
                      </a>
                      <a onClick={ this.validImport } href="javascript:void(0);" className="mx-4 valid">
                        <i className="icon-check fa-3x"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-none step_2">
                <div className="col-12">
                  <div className="form-input mb-3">
                    <label htmlFor="company">Nommez votre création !</label>
                    <input type="mail" className="form-control" name="mail" placeholder="Fusée de l'espace" />
                  </div>
                </div>
              </div>
              <div className="row d-none step_3">
                <div className="col-12">
                  <div className="form-input mb-3">
                    <label htmlFor="company">Maintenant, donnez-lui une description !</label>
                    <input text="text" className="form-control" name="mail" placeholder="C'est une belle fusée qui décolle avec panache !" />
                  </div>
                </div>
              </div>
              <div className="row d-none step_4">
                <div className="col-12">
                  <p>Choisissez vos formats :</p>
                </div>
              </div>
              <div className="row d-none step_5">
                <div className="col-12">
                  <p>Choisissez vos ancrages :</p>
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

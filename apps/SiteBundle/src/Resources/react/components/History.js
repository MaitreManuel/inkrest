import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';

import Footer from './Footer';
import Nav from './Nav';

class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="History">
        <Nav/>
        <div className="container-fluid">
          <div className="row blockheader">
            <div className="col-12">
              <h1>Histoire</h1>
              <p>Un petit bout d{'\''}histoire sur la création de inkrest.</p>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12">

              <VerticalTimeline>
                <VerticalTimelineElement
                  className="bt-blue"
                  date="Novembre 2017"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#ffffff' }}
                  icon={ <i className="icon-feed tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Digitalisation</h3>
                  <h4 className="vertical-timeline-element-subtitle">Création d{'\''}une branche digitale</h4>
                  <p>
                    Total Print ouvre une branche digitale de e-commerce pour vendre différentes impressions en ligne. Son nom ? inkrest.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-blue"
                  date="Avril 1983"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#ffffff' }}
                  icon={ <i className="icon-printer tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Nouveau départ</h3>
                  <h4 className="vertical-timeline-element-subtitle">Changement de nom</h4>
                  <p>
                    Après 5 années difficiles, Dupont-Imprimerie décide de se renommer Total Print, achète du nouveau matériel et engage de nouveaux salariés.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-orange"
                  date="Février 1978"
                  iconStyle={{ background: 'rgb(255, 153, 0)', color: '#ffffff' }}
                  icon={ <i className="icon-graph tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Chute économique</h3>
                  <h4 className="vertical-timeline-element-subtitle">Effondrement de l{'\''}entreprise</h4>
                  <p>
                    Après les chocs pétroliers et la crise économique, Dupont-Imprimerie en subit sur ses bénéfices et doit licencier des salariés ce qui ralentit considérablement la production.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-pink"
                  date="1945 - 1973"
                  iconStyle={{ background: 'rgb(233, 30, 99)', color: '#ffffff' }}
                  icon={ <i className="icon-rocket tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Trentes Glorieuses</h3>
                  <h4 className="vertical-timeline-element-subtitle">Croissance économique</h4>
                  <p>
                    Dupont-Imprimerie monte en flèche, les bénéfices pérénisent l{'\''}entreprise.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-blue"
                  date="Novembre 1945"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#ffffff' }}
                  icon={ <i className="icon-briefcase tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Retour de Dupont-Imprimerie</h3>
                  <h4 className="vertical-timeline-element-subtitle">Reprise des affaires</h4>
                  <p>
                    Dupont-Imprimerie renaît de ses cendres et reprend ses activités d{'\''}avant-guerre
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-green"
                  date="Septembre 1945"
                  iconStyle={{ background: 'rgb(0, 204, 0)', color: '#ffffff' }}
                  icon={ <i className="icon-badge tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Fin de la seconde guerre mondiale</h3>
                  <h4 className="vertical-timeline-element-subtitle">Une fin attendue</h4>
                  <p>
                    La début de la reconstruction !
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-pink"
                  date="1942 - 1945"
                  iconStyle={{ background: 'rgb(233, 30, 99)', color: '#ffffff' }}
                  icon={ <i className="icon-trophy tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Reprise de l{'\''}entreprise</h3>
                  <h4 className="vertical-timeline-element-subtitle">Nantes, 44000 FR</h4>
                  <p>
                    L{'\''}entreprise imprime des tracts pour faire appel à la résistance tout en se cachant.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-red"
                  date="Janvier 1942"
                  iconStyle={{ background: 'rgb(229, 54, 30)', color: '#ffffff' }}
                  icon={ <i className="icon-lock tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Mise en pause de l{'\''}entreprise</h3>
                  <h4 className="vertical-timeline-element-subtitle">Arrêt de la production</h4>
                  <p>
                    En ces temps de guerre, les habitants de Saint-Nazaire ont fuit mettant en suspend la production.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-black"
                  date="Septembre 1939"
                  iconStyle={{ background: 'rgb(0, 0, 0)', color: '#ffffff' }}
                  icon={ <i className="icon-globe-alt tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Seconde guerre mondiale</h3>
                  <h4 className="vertical-timeline-element-subtitle">Début d{'\''}un mauvais âge</h4>
                  <p>
                    La guerre est déclarée, les ennuis commencent.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="bt-green"
                  date="Juin 1936"
                  iconStyle={{ background: 'rgb(0, 204, 0)', color: '#ffffff' }}
                  icon={ <i className="icon-bulb tmln-ico-size"></i> } >
                  <h3 className="vertical-timeline-element-title">Fondation de Dupont-Imprimerie</h3>
                  <h4 className="vertical-timeline-element-subtitle">Saint-Nazaire, 44600 FR</h4>
                  <p>
                    Entreprise d{'\''}impression de formulaires, de prospectus et d{'\''}affiches.
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>

            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default History;

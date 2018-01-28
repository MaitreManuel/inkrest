import React from 'react';

class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer id="Footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10 text-center last-node">
              <span>&copy; 2017 - <a className="me fadein" href="https://github.com/MaitreManuel" target="_blank" rel="noopener noreferrer">Trystan Eveno</a></span>
            </div>
            <div className="col-1 text-right last-node">
              <span className="qs d-none"><i className="icon-question"></i> <span className="text-center pop ">Besoin d{'\''}aide ?</span></span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default History;

import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './utils/Routes';

const container = document.getElementById('container');

if(container) {
  ReactDOM.render(<Routes/>, container);
}

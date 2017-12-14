import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

const container = document.getElementById('app-root');

if(container) {
  ReactDOM.render(<Root/>, container);
}

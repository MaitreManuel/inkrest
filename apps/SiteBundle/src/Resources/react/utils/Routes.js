import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './../components/Home';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home }></Route>
          <Route exact path="/account" render={ () => <div>User account</div> }></Route>
          <Route exact path="/products" render={ () => <div>Products</div> }></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}


module.exports = Routes;

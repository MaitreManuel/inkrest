import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Account from './../components/Account';
import Basket from './../components/Basket';
import History from './../components/History';
import Home from './../components/Home';
import NotFound from './../components/NotFound';
import Product from './../components/Product';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home }></Route>
          <Route exact path="/account" component={ Account }></Route>
          <Route exact path="/basket" component={ Basket }></Route>
          <Route exact path="/history" component={ History }></Route>
          <Route exact path="/products" component={ Product }></Route>
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}


module.exports = Routes;

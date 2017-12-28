import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Account from './../components/Account';
import Basket from './../components/Basket';
import Creation from './../components/Creation';
import History from './../components/History';
import Home from './../components/Home';
import Login from './../components/Login';
import NotFound from './../components/NotFound';
import Product from './../components/Product';
import Register from './../components/Register';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home }></Route>
          <Route exact path="/account" component={ Account }></Route>
          <Route exact path="/basket" component={ Basket }></Route>
          <Route exact path="/creation" component={ Creation }></Route>
          <Route exact path="/history" component={ History }></Route>
          <Route exact path="/login" component={ Login }></Route>
          <Route exact path="/products" component={ Product }></Route>
          <Route exact path="/register" component={ Register }></Route>
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default Routes;

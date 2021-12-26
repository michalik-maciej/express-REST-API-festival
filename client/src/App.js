import { Route, Switch } from 'react-router-dom';

import Home from './components/pages/Home/HomePage';
import MainLayout from './components/layout/MainLayout/MainLayout';
import NotFound from './components/pages/NotFound/NotFoundPage';
import Order from './components/pages/Order/OrderPage.js';
import Prices from './components/pages/Prices/PricesPage';
import React from 'react';

class App extends React.Component {

  render() {
    return (
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/prices" exact component={Prices} />
          <Route path="/order-a-ticket" exact component={Order} />
          <Route component={NotFound} />
        </Switch>
      </MainLayout>
    );
  }

}

export default App;

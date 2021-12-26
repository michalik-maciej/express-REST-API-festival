import { Route, Switch } from 'react-router-dom';

import Concert from '../Concert/Concert';
import React from 'react';
import Workshops from '../Workshops/Workshops'

const Events = ({ events }) => 
  <Switch>
    <Route path="/" exact render={() => events.map(event => <Concert key={event['_id']} {...event}/>)} />
    <Route path="/prices/" exact render={() => events.map(event => <Workshops key={event['_id']} event={event} />)} />
  </Switch>

export default Events;

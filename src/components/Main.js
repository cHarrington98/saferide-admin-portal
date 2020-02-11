import React from 'react';
import { Switch, Route } from 'react-router-dom';

//You will need to import your page here.
import CarList from './cars/CarList';
import Home from './home/home';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/cars' component={CarList}></Route>
    </Switch>
  );
}

export default Main;
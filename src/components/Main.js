import React from 'react';
import { Switch, Route } from 'react-router-dom';

//You will need to import your page here.
import CarList from './cars/CarList';
import Home from './home/home';
import UserList from './users/UserList';
import PickUpPointList from './pickUpPoints/PickUpPointList'

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/cars' component={CarList}></Route>
      <Route exact path='/users' component={UserList}></Route>
      <Route exact path='/pick-up-points' component={PickUpPointList}></Route>
    </Switch>
  );
}

export default Main;
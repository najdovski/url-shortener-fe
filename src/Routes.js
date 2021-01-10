import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import RedirectOr404 from './components/pages/RedirectOr404';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="*" component={RedirectOr404} />
    </Switch>
  )
}

export default Routes

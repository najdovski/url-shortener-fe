import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import VerifyEmail from './components/pages/VerifyEmail';
import RedirectOrNotFound from './components/pages/RedirectOrNotFound';
import MyUrls from './components/pages/protected/MyUrls';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" render={() =>
        <>
          <Navbar />
            <Home />
          <Footer />
        </>
      } />

      <Route exact path="/login" render={() =>
        <>
          <Navbar />
            <Login />
          <Footer />
        </>
      } />

      <Route exact path="/register" render={() =>
        <>
          <Navbar />
            <Register />
          <Footer />
        </>
      } />

      <Route path="/email/verify" render={() =>
        <>
          <Navbar />
            <VerifyEmail />
          <Footer />
        </>
      } />

      <Route exact path="/my-urls" render={() =>
        <>
          <Navbar />
            <MyUrls />
          <Footer />
        </>
      } />

      <Route path="*" component={RedirectOrNotFound} />
    </Switch>
  )
}

export default Routes

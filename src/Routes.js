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
import Profile from './components/pages/protected/Profile';
import ResetPassword from './components/pages/ResetPassword';

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

      <Route exact path="/profile" render={() =>
        <>
          <Navbar />
            <Profile />
          <Footer />
        </>
      } />

      <Route path="/forgot-password" render={() =>
        <>
          <Navbar />
            <ResetPassword />
          <Footer />
        </>
      } />

      <Route path="*" component={RedirectOrNotFound} />
    </Switch>
  )
}

export default Routes

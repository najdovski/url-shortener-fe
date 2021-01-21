import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import CookieConsent from "react-cookie-consent";

const Navbar = () => {
  const [cookies, removeCookie] = useCookies(['access_token']);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    let expirationTime = new Date(); // make it expired
    removeCookie('access_token', '', { path: '/', expires: expirationTime });
    setUserName('');
    setRedirect(true);
  }

  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!cookies['access_token'] || userName) {
      return;
    }

    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/users/single`,
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      setUserName(response.data.name);
    })
    .catch(() => {
      setUserName('');
    })
  });

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="cookies_consent"
        style={{ background: "#2B373B" }}
        buttonStyle={{ background: '#f1075c', color: 'white', fontSize: '13px', borderRadius: '3px'  }}
      >
      This website uses cookies to enhance the user experience
    </CookieConsent>

    {redirect ? <Redirect to="/" /> : null}
    <nav className="navbar navbar-expand-md navbar-light">
      <Link to="/" className="navbar-brand"><i className="fas fa-link mr-2 text-primary"></i><span className="font-weight-bold">{process.env.REACT_APP_NAME}</span></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-angle-double-down"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ml-auto mt-2 mt-sm-0">
          {userName ?
            <li className={'nav-item mx-2 ' + (userName ? 'animation-fade-in' : 'd-none')}>
              <div className="text-muted small text-right my-2 my-md-1">
                <div className="d-inline-block d-md-block mr-1 mr-md-0">Welcome back,</div>
                <div className="d-inline-block d-md-block font-weight-bold text-dark">{userName}</div>
              </div>
            </li>
            : null }
          <li className="nav-item">
            <Link to={cookies['access_token'] ? '/my-urls' : '/register'} className="nav-link btn btn-primary btn-register px-3 mx-1 font-weight-bold rounded-0 text-white">{cookies['access_token'] ? 'My URLs' : 'Register'}</Link>
          </li>
          {cookies['access_token'] ? 
            <li className="nav-item my-2 my-md-0">
              <Link to="/profile" className="nav-link btn btn-primary btn-register px-3 mx-1 font-weight-bold rounded-0 text-white">Profile</Link>
            </li>
          : null }
          <li className="nav-item">
            {cookies['access_token'] ? 
            <span onClick={() => handleLogout()} className="nav-link btn btn-login font-weight-bold rounded-0"><u>Logout</u></span> : <Link to="/login" className="nav-link btn btn-login px-3 mx-1 font-weight-bold rounded-0"><u>Login</u></Link>}
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar
